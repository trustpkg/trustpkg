#!/bin/bash

set -eE

source scripts/helpers/timestampLog.sh
source scripts/helpers/progressBar.sh

total_steps=4

cleanup_loader() {
	global_loader_stop
}

on_error() {
	global_loader_fail "$total_steps" "Theme generation failed"
	source scripts/helpers/errorLog.sh "Theme generation failed at line $LINENO"
}

trap cleanup_loader EXIT
trap on_error ERR

source scripts/helpers/runLog.sh "Generating themes..."
current_step=0

global_loader_start "$total_steps" "Starting theme generation"

global_loader_clear_line
current_step=$((current_step + 1))
timestamp_log "RUN" "Preparing TypeScript theme generator"
global_loader_update "$current_step" "$total_steps" "Preparing generator"

current_step=$((current_step + 1))
global_loader_update "$current_step" "$total_steps" "Running theme generator"

npx tsx src/theme/scripts/generateThemes.ts

current_step=$((current_step + 1))
timestamp_log "RUN" "TypeScript generation finished"
global_loader_update "$current_step" "$total_steps" "Generated artifacts"

global_loader_clear_line
source scripts/helpers/successLog.sh "Theme generation finished successfully."

current_step=$((current_step + 1))
global_loader_clear_line
global_loader_finish "$total_steps" "Completed"