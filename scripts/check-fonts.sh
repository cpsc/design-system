#!/usr/bin/env bash
# Fails if a vendored Geist file differs from the one in the geist package that bun.lock pins
# (vendor/geist/VENDORED maps each file to its path in the package). Run after `bun ci`.
set -euo pipefail

cd "$(dirname "$0")/.."
status=0
while IFS=' = ' read -r name source; do
  case "$name" in '#'* | package | '') continue ;; esac
  if ! cmp -s "vendor/geist/$name" "node_modules/geist/$source"; then
    echo "error: vendor/geist/$name differs from node_modules/geist/$source" >&2
    status=1
  fi
done < vendor/geist/VENDORED
exit $status
