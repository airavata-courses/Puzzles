#!/bin/bash

echo
echo 'Destroying K8s Deployments'
kubectl delete deployments --ignore-not-found=true angular-ui-deployment api-gateway-deployment auth-deployment history-deployment profile-deployment radar-deployment mongo-profile-deployment mysql-history-deployment
kubectl delete services --ignore-not-found=true angular-ui-service api-gateway-service auth-service history-service profile-service radar-service mongo-profile-service mysqldb

echo
echo 'Destroying K8s Volumes'
kubectl delete --ignore-not-found=true -f mysql-initdb-pv-volume.yml

echo
echo 'Deploying Metric Server'
kubectl delete --ignore-not-found=true -f metricserver-0.6.1.yaml

echo
echo 'Deploying Nginx'
kubectl delete --ignore-not-found=true -f ingress-nginx-server.yaml

echo
echo 'Deleting Ingress'
kubectl delete --ignore-not-found=true -f ingress-gateway.yml
kubectl delete --ignore-not-found=true -f ingress-ui.yml

echo
echo 'Destroying K8s ConfigMaps and Secrets'
kubectl delete configmap --ignore-not-found=true app-config
kubectl delete secret --ignore-not-found=true app-secret