# A simple project on Docker & Node
A simple ui backend application using `JavaScript`, `Node`, `Express` to integrate with docker container of `MongoDB` database.

<br>

### Docker | Node | Express | MongoDB

          
    node --> MongoDB(docker) <--> MongoExpress(docker) 


<hr>
<br>

## Basic Docker Commands
> docker pull 

> docker run

> docker start

> docker stop

> docker ps

> docker exec -it 

> docker logs

<br>
<hr>
<br>

## Developing with Containers
### pull docker image
1. `docker pull mongo`
2. `docker pull mongo-express`

> next step is to run mongo and mongo-express containers  in order to make mongodb database available for application and also connect

### create docker network
`docker network create mongo-network`

> now have to run mongo container inside mongo-express container in docker network

### run containers
```
docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
--name mongodb-container \
--net mongo-network \
mongo
```

```
docker run -d \
-p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_SERVER=mongodb-container \
--name mongo-express-container \
--net mongo-network \
mongo-express
```

> run `docker ps` to check if its running.

> Go to browser localhost:8081 and create a database "user-account" and create collection "users"
### connect node server with mongo express
> go to local nodejs project and start the project.

    node server.js

> Go to localhost:3000


<br>
<hr>

[-p]: port flag.

[-d]: detachable mode flag.

[-e]: environmental variable flag.

[--name]: name of the running container.

[--net]: name of the network.

[--rm]: auto removes the container when stops.
