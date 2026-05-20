#!/usr/bin/env bash
# Start a local static preview server for wireframe HTML (repo root).
set -euo pipefail

KIT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$KIT_ROOT/.." && pwd)"
PORT="${PORT:-8765}"
PID_FILE="$KIT_ROOT/.preview-server.pid"
URL="http://localhost:${PORT}/index.html"

stop_server() {
  if [[ -f "$PID_FILE" ]]; then
    local pid
    pid="$(cat "$PID_FILE")"
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null || true
      echo "Stopped preview server (pid $pid)."
    fi
    rm -f "$PID_FILE"
  fi
}

status_server() {
  if [[ -f "$PID_FILE" ]]; then
    local pid
    pid="$(cat "$PID_FILE")"
    if kill -0 "$pid" 2>/dev/null; then
      echo "Preview server running: $URL (pid $pid)"
      return 0
    fi
    rm -f "$PID_FILE"
  fi
  return 1
}

case "${1:-start}" in
  start)
    if status_server 2>/dev/null; then
      exit 0
    fi
    cd "$REPO_ROOT"
    nohup python3 -m http.server "$PORT" >/dev/null 2>&1 &
    echo $! >"$PID_FILE"
    echo "Preview server started: $URL"
    echo "Stop with: make serve-stop"
    ;;
  stop)
    stop_server
    ;;
  status)
    status_server || echo "Preview server is not running."
    ;;
  *)
    echo "Usage: serve-local.sh {start|stop|status}" >&2
    exit 1
    ;;
esac
