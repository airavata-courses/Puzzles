### Java Spring Boot User History Service


This microservice stores the User History and shows user their recent searches

### Prerequisites

Docker should be installed 

Steps to install
- 

After cloning the repository, Go to the root of the Spring Boot folder
```
cd ./SpringBootSearchServiceProject

```

Then , run the command 

``` 
docker build -t p1-history
``` 

Run the MySQL Docker image
```
docker run --name mysqldb -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=SpringDataBase -e MYSQL_USER=sa -e MYSQL_PASSWORD=password -d mysql
```

Run the Spring Boot API Docker Image

```
docker run -d -p 10000:10000 --name p1-history --link mysqldb:mysql p1-history
```
