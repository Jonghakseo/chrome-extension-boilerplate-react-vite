#!/bin/bash

set -e

TARGET=${TARGET:-chrome}

pnpm install

if [[ $TARGET == 'firefox' ]]; then
  exec pnpm dev:firefox "$@"
fi

exec pnpm dev "$@"
