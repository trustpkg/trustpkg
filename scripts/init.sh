#!/bin/bash

set -e

source ./scripts/helpers/runLog.sh "Installing git hooks..."

cp ./scripts/prePush.sh .git/hooks/pre-push
cp ./scripts/preCommit.sh .git/hooks/pre-commit

chmod +x .git/hooks/pre-push 
chmod +x .git/hooks/pre-commit

echo -e "Git hooks:\n" && ls -la .git/hooks 

source ./scripts/helpers/successLog.sh "Git hooks installed successfully!"
