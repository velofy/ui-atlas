import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// Gentle vignette plus a whisper of film grain, applied before output tonemapping.
const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uVignette: { value: 0.34 },
    uGrain: { value: 0.045 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uVignette;
    uniform float uGrain;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7)) + uTime * 17.0) * 43758.5453);
    }

    void main() {
      vec4 col = texture2D(tDiffuse, vUv);
      vec2 d = vUv - 0.5;
      col.rgb *= 1.0 - uVignette * smoothstep(0.3, 1.0, dot(d, d) * 2.4);
      col.rgb += (hash(vUv * vec2(1920.0, 1080.0)) - 0.5) * uGrain;
      gl_FragColor = col;
    }
  `,
};

const DPR_STEPS = [1, 0.85, 0.7, 0.55];

export class Stage {
  constructor(canvas, { mobile = false, reducedMotion = false } = {}) {
    this.mobile = mobile;
    this.baseDpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    this.dprStep = 0;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(this.baseDpr);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    // Depth of field is the first thing sacrificed on mobile GPUs.
    if (!mobile) {
      this.bokeh = new BokehPass(this.scene, this.camera, {
        focus: 16,
        aperture: 0.00012,
        maxblur: 0.0055,
      });
      this.composer.addPass(this.bokeh);
    }

    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.55,
      0.7,
      0.82
    );
    this.composer.addPass(this.bloom);

    if (!reducedMotion) {
      this.grade = new ShaderPass(GradeShader);
      this.composer.addPass(this.grade);
    }

    this.composer.addPass(new OutputPass());

    this._acc = 0;
    this._frames = 0;

    window.addEventListener('resize', () => this.resize());
  }

  setFocus(distance) {
    if (this.bokeh) this.bokeh.uniforms.focus.value = distance;
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this._applyDpr();
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
  }

  _applyDpr() {
    const dpr = this.baseDpr * DPR_STEPS[this.dprStep];
    this.renderer.setPixelRatio(dpr);
    this.composer.setPixelRatio(dpr);
  }

  // Adaptive resolution: drop a step when the frame rate sags,
  // climb back when there is headroom again.
  _adapt(dt) {
    this._acc += dt;
    this._frames += 1;
    if (this._acc < 1.5) return;
    const fps = this._frames / this._acc;
    this._acc = 0;
    this._frames = 0;
    if (fps < 47 && this.dprStep < DPR_STEPS.length - 1) {
      this.dprStep += 1;
      this._applyDpr();
    } else if (fps > 57 && this.dprStep > 0) {
      this.dprStep -= 1;
      this._applyDpr();
    }
  }

  render(dt, t) {
    if (this.grade) this.grade.uniforms.uTime.value = t % 10;
    this.composer.render();
    this._adapt(dt);
  }
}
