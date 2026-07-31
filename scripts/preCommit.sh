#!/bin/bash 

source scripts/helpers/runLog.sh "Running pre-commit checks..."

pnpm typecheck || {
  source scripts/helpers/errorLog.sh "Typecheck failed. Please fix the errors before committing."
  exit 1 
}

source scripts/helpers/successLog.sh "Pre-commit checks passed."