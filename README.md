# Puzzles Kubernetes Cluster

#### Prerequisites
- Docker
- Kubernetes
- Helm

#### Steps to deploy Kubernetes cluster
- Clone repository
```
git clone -b p2-kubernetes https://github.com/airavata-courses/Puzzles.git
```

- Go to directory
```
cd Puzzles/kubernetes-pkg
```

- Create application cluster
```
helm upgrade -i puzzles puzzles-0.1.0.tgz
```

- Tear down application cluster
```
helm uninstall puzzles
```

- To create fixed replicas of all services
```
helm upgrade -i puzzles puzzles-0.1.0.tgz --set replicaCount=<count of replicas per service>
```

- To enable autoscaling of services
```
helm upgrade -i puzzles puzzles-0.1.0.tgz --set autoscaling.enabled=true
```

- To disable autoscaling of services
```
helm upgrade -i puzzles puzzles-0.1.0.tgz --set autoscaling.enabled=false
```

#### In case of errors while installing the package
- Run uninstall command first
- Run install command again

#### How to access Kubernetes Cluster
- Register hostname to IP addresses in the host file 
  - Docker for Desktop
  ```
  127.0.0.1 puzzles.weatherapp.com
  ```

  - Minikube
  ```
  <Minikube IP> puzzles.weatherapp.com
  ```

- Go to **puzzles.weatherapp.com** to access the application

#### How to install Helm
- Windows 
```
choco install kubernetes-helm
```

- MacOS
```
brew install helm
```

- Ubuntu
```
curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
sudo apt-get install apt-transport-https --yes
echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```
