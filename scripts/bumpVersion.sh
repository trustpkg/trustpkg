#!/bin/bash

set -eE
trap 'source scripts/helpers/errorLog.sh "Command failed at line $LINENO"' ERR

source scripts/helpers/runLog.sh "Bumping version based on conventional commits..."

git fetch --tags

if git describe --tags --abbrev=0 >/dev/null 2>&1; then
  version=$(git describe --tags --abbrev=0)
  commit_range="$version..HEAD"
else
  version="0.0.0"
  source scripts/helpers/warningLog.sh "No tags found. Using default: $version"
  commit_range="HEAD"
fi

if ! git rev-parse --git-dir > /dev/null 2>&1; then
  source scripts/helpers/errorLog.sh "Not a git repository or no commits found."
  exit 1
fi

function incrementVersionByConventionalCommits() {
  local current_version=$1
  local range=$2
  
  local commitMessages
  commitMessages=$(git log "$range" --pretty=format:%s 2>/dev/null)

  if [ -z "$commitMessages" ]; then
    source scripts/helpers/warningLog.sh "No conventional commits found. Version remains: $current_version" >&2
    echo "$current_version"
    return
  fi

  local majorCount
  majorCount=$(echo "$commitMessages" | grep -cE "^(feat|fix|perf|refactor|docs|style|test|chore)(\(.+\))?!: " || true)
  
  local minorCount
  minorCount=$(echo "$commitMessages" | grep -cE "^(feat)(\(.+\))?: " || true)
  
  local patchCount
  patchCount=$(echo "$commitMessages" | grep -cE "^(fix)(\(.+\))?: " || true)

  if [ "$majorCount" -gt 0 ]; then
    current_version=$(echo "$current_version" | awk -F. -v OFS=. '{$1++; $2=0; $3=0; print}')
  elif [ "$minorCount" -gt 0 ]; then
    current_version=$(echo "$current_version" | awk -F. -v OFS=. '{$2++; $3=0; print}')
  elif [ "$patchCount" -gt 0 ]; then
    current_version=$(echo "$current_version" | awk -F. -v OFS=. '{$3++; print}')
  fi

  source scripts/helpers/successLog.sh "New version: $current_version" >&2
  echo "$current_version"
}

newVersion=$(incrementVersionByConventionalCommits "$version" "$commit_range")

if [ "$newVersion" != "$version" ]; then
  git tag "$newVersion"
  source scripts/helpers/runLog.sh "Pushing tag $newVersion to origin..."
  git push origin "$newVersion"
  
  source scripts/helpers/successLog.sh "New tag created: $newVersion"
else
  source scripts/helpers/warningLog.sh "No version increment needed. Version remains: $version"
fi

source scripts/helpers/doneLog.sh "Version bump script complete."