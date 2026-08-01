#!/bin/bash

set -e

timestamp_now() {
  date +"%Y-%m-%d %H:%M:%S"
}

timestamp_log() {
  local level=$1
  shift

  echo "[$(timestamp_now)] [$level] $*"
}