#!/bin/bash 

source scripts/helpers/runLog.sh "Running pre-commit checks..."

pnpm typecheck || {
  source scripts/helpers/errorLog.sh "Typecheck failed. Please fix the errors before committing."
  exit 1 
}

pnpm audit --audit-level high || {
  source scripts/helpers/errorLog.sh "Vulnerabilities found. Please fix the issues before committing."
  exit 1
}

source scripts/helpers/successLog.sh "Pre-commit checks passed."