#!/bin/bash

read -p "Do you want to delete the remote image before building and pushing? (y/n): " user_input

if [[ "$user_input" =~ ^[Yy]$ ]]; then
  echo "Will delete remote image"
  delete_remote_image=true
else
  echo "Will not delete remote image"
  delete_remote_image=false
fi

read -p "Please enter the ECR base URL: " ecr_base_url
echo "ECR base URL: $ecr_base_url"

declare -A services=(
  ["ender"]="Dockerfile.service.remote"
  ["vulcan"]="Dockerfile.service.remote"
  ["socks"]="Dockerfile.service.remote"
  ["roundtable"]="Dockerfile.service.remote"
  ["comlink"]="Dockerfile.service.remote"
  ["auxo"]="Dockerfile.auxo.remote"
  ["bazooka"]="Dockerfile.bazooka.remote"
)


for service in "${!services[@]}"; do
  dockerfile="${services[$service]}"
  
  echo "Building and pushing Docker image for service: $service using $dockerfile"

  if [ "$delete_remote_image" = true ]; then
    echo "Deleting current remote image"
    aws ecr batch-delete-image --repository-name "dev-indexer-$service" --image-ids imageTag=latest
    echo "Done deleting remote image."
  fi

  echo "Building and pushing new image"

  sudo docker build --platform amd64 -t "$ecr_base_url/dev-indexer-$service:latest" -f "$dockerfile" --build-arg service="$service" .

  sudo docker push "$ecr_base_url/dev-indexer-$service:latest"

  echo "Completed for service: $service"
done
