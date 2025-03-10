#!/bin/bash

# Set AWS region
AWS_REGION="sa-east-1"

# List of environments
ENVIRONMENTS=("mainnet" "testnet" "staging" "dev")

# List of base repository names
REPOS=("indexer-auxo" "indexer-bazooka" "indexer-comlink" "indexer-ender" "indexer-roundtable" "indexer-socks" "indexer-vulcan")

# Loop through environments and repo names to create ECR repositories
for env in "${ENVIRONMENTS[@]}"; do
  for repo in "${REPOS[@]}"; do
    FULL_REPO_NAME="${env}-${repo}"
    echo "Creating ECR repository: $FULL_REPO_NAME in region $AWS_REGION"

    # Create the ECR repository with image immutability enabled
    aws ecr create-repository --repository-name "$FULL_REPO_NAME" --region "$AWS_REGION" --image-tag-mutability IMMUTABLE 

    # Check if the creation was successful
    if [ $? -eq 0 ]; then
      echo "Successfully created: $FULL_REPO_NAME (Immutable)"
    else
      echo "Failed to create: $FULL_REPO_NAME"
    fi
  done
done

echo "All repositories processed!"
