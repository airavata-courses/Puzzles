#!/bin/bash

echo
echo 'Deploying K8s ConfigMaps and Secrets'
kubectl apply -f app-config.yml
kubectl apply -f app-secret.yml

echo
echo 'Deploying Ingress'
kubectl apply -f ingress-gateway.yml
kubectl apply -f ingress-ui.yml

echo
echo 'Deploying Nginx'
kubectl apply -f ingress-nginx-server.yaml

echo
echo 'Deploying Metric Server'
kubectl apply -f metricserver-0.6.1.yaml

echo
echo 'Deploying K8s Volumes'
kubectl apply -f mysql-initdb-pv-volume.yml

echo
echo 'Deploying K8s Deployments'
kubectl apply -f mysql-history-deployment.yml
kubectl apply -f mongo-profile-deployment.yml
kubectl apply -f angular-ui-deployment.yml
kubectl apply -f api-gateway-deployment.yml
kubectl apply -f auth-deployment.yml
kubectl apply -f radar-deployment.yml
kubectl apply -f profile-deployment.yml
kubectl apply -f history-deployment.yml
