#!/usr/bin/env bash

set -eo pipefail

podman build -f Dockerfile.node -t bowerio

podman run -v "$PWD:/app" bowerio yarn 

podman run --rm -it -v "$PWD:/app:z" --env-file .env bowerio bash
