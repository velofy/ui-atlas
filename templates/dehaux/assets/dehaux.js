/* Dehaux demo chrome: palette switching, clock, small page behaviors. */

(function () {
  var KEY = "dehaux-palette";
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved) document.documentElement.setAttribute("data-palette", saved);

  function markDock() {
    var current = document.documentElement.getAttribute("data-palette") || "copper";
    document.querySelectorAll(".palette-dock button").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-set") === current);
    });
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest(".palette-dock button");
    if (!b) return;
    var p = b.getAttribute("data-set");
    document.documentElement.setAttribute("data-palette", p);
    try { localStorage.setItem(KEY, p); } catch (err) {}
    markDock();
  });

  document.addEventListener("DOMContentLoaded", function () {
    markDock();

    var clock = document.querySelector("[data-clock]");
    if (clock) {
      var tick = function () {
        var d = new Date();
        var hh = String(d.getHours()).padStart(2, "0");
        var mm = String(d.getMinutes()).padStart(2, "0");
        clock.textContent = hh + ":" + mm;
      };
      tick();
      setInterval(tick, 15000);
    }

    document.querySelectorAll("[data-reveal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var input = document.getElementById(btn.getAttribute("data-reveal"));
        if (!input) return;
        input.type = input.type === "password" ? "text" : "password";
      });
    });

    var redirect = document.querySelector("[data-redirect]");
    if (redirect) {
      setTimeout(function () {
        window.location.href = redirect.getAttribute("data-redirect");
      }, 2600);
    }

    var note = document.querySelector("[data-signednote]");
    if (note && window.location.search.indexOf("signed_out=1") === -1) {
      note.style.display = "none";
    }
  });
})();
