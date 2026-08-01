#!/bin/bash

set -e

source scripts/helpers/timestampLog.sh

GLOBAL_LOADER_STATE_FILE=""

_global_loader_cleanup_state() {
  if [[ -n "$GLOBAL_LOADER_STATE_FILE" && -f "$GLOBAL_LOADER_STATE_FILE" ]]; then
    rm -f "$GLOBAL_LOADER_STATE_FILE"
  fi

  GLOBAL_LOADER_STATE_FILE=""
}

_global_loader_write_state() {
  local current=$1
  local total=$2
  local message=$3
  local status=$4

  printf '%s|%s|%s|%s\n' "$current" "$total" "$status" "$message" > "$GLOBAL_LOADER_STATE_FILE"
}

_global_loader_render() {
  local current=$1
  local total=$2
  local message=$3
  local status=$4
  local bar_width=28
  local cyan_color='\033[38;5;45m'
  local red_color='\033[0;31m'
  local green_color='\033[38;5;34m'
  local reset_color='\033[0m'

  if [[ -z "$total" || "$total" -le 0 ]]; then
    total=1
  fi

  if [[ "$current" -gt "$total" ]]; then
    current=$total
  fi

  local percent=$(( current * 100 / total ))
  local filled=$(( current * bar_width / total ))
  local empty=$(( bar_width - filled ))
  local filled_part
  local empty_part
  local state_label="PROGRESS"
  local color="$cyan_color"

  if [[ "$status" == "done" ]]; then
    state_label="PROGRESS"
    color="$green_color"
  elif [[ "$status" == "failed" ]]; then
    state_label="PROGRESS"
    color="$red_color"
  fi

  filled_part=$(printf '%*s' "$filled" '' | tr ' ' '#')
  empty_part=$(printf '%*s' "$empty" '' | tr ' ' '-')

  if [[ -t 1 ]]; then
    printf "\r\033[2K%b[%s] [%s] [%s%s] %3d%% %s%b" "$color" "$(timestamp_now)" "$state_label" "${filled_part}" "${empty_part}" "$percent" "$message" "$reset_color"

    if [[ "$status" == "done" || "$status" == "failed" ]]; then
      printf "\n"
    fi
  fi
}

global_loader_start() {
  local total=$1
  local message=${2:-"Starting..."}

  if [[ ! -t 1 ]] || ! command -v tput > /dev/null 2>&1; then
    return
  fi

  if [[ -z "$total" || "$total" -le 0 ]]; then
    total=1
  fi

  GLOBAL_LOADER_STATE_FILE=$(mktemp)
  _global_loader_write_state 0 "$total" "$message" "running"
  _global_loader_render 0 "$total" "$message" "running"
}

global_loader_update() {
  local current=$1
  local total=$2
  local message=$3

  if [[ -z "$GLOBAL_LOADER_STATE_FILE" || ! -f "$GLOBAL_LOADER_STATE_FILE" ]]; then
    return
  fi

  if [[ -z "$total" || "$total" -le 0 ]]; then
    total=1
  fi

  _global_loader_write_state "$current" "$total" "$message" "running"
  _global_loader_render "$current" "$total" "$message" "running"
}

global_loader_finish() {
  local total=$1
  local message=${2:-"Done"}

  if [[ -z "$GLOBAL_LOADER_STATE_FILE" || ! -f "$GLOBAL_LOADER_STATE_FILE" ]]; then
    return
  fi

  if [[ -z "$total" || "$total" -le 0 ]]; then
    total=1
  fi

  _global_loader_write_state "$total" "$total" "$message" "done"
  _global_loader_render "$total" "$total" "$message" "done"
  _global_loader_cleanup_state
}

global_loader_fail() {
  local total=$1
  local message=${2:-"Failed"}

  if [[ -z "$GLOBAL_LOADER_STATE_FILE" || ! -f "$GLOBAL_LOADER_STATE_FILE" ]]; then
    return
  fi

  if [[ -z "$total" || "$total" -le 0 ]]; then
    total=1
  fi

  _global_loader_write_state "$total" "$total" "$message" "failed"
  _global_loader_render "$total" "$total" "$message" "failed"
  _global_loader_cleanup_state
}

global_loader_stop() {
  local clear_line=${1:-0}

  if [[ "$clear_line" -eq 1 ]] && [[ -t 1 ]]; then
    printf "\r\033[2K"
  fi

  _global_loader_cleanup_state
}

global_loader_clear_line() {
  if [[ -t 1 ]]; then
    printf "\r\033[2K"
  fi
}