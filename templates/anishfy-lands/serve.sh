#!/usr/bin/env bash
# Serve anishfy-lands locally. Any static server works; this uses python3.
set -euo pipefail

cd "$(dirname "$0")"

PORT="${1:-8000}"
URL="http://localhost:${PORT}/"

echo "anishfy lands"
echo "Serving at ${URL} (Ctrl+C to stop)"

if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "${PORT}"
elif command -v python >/dev/null 2>&1; then
  exec python -m SimpleHTTPServer "${PORT}"
else
  echo "python3 not found. Any static file server will do:" >&2
  echo "  npx serve ." >&2
  exit 1
fi
