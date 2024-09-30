#!/usr/bin/env bash

set -eo pipefail

docker buildx build -t bowerio -f Dockerfile.node .

docker run -v "$PWD:/app:z" bowerio yarn 

docker run --rm -it -v "$PWD:/app:z" --env-file .env bowerio bash
