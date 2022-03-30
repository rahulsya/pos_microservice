# pos_microservice

## env file atributes 
- PORT=4001
- DB_HOST=localhost
- DB_USERNAME=your db username
- DB_PASSWORD=your db password
- DB_NAME=your db name

##env for api gateway
- APP_NAME=Api gateway
- PORT=4000
- TIMEOUT=5000
- URL_SERVICE_MEDIA=http://localhost:8081
- URL_SERVICE_USER=http://localhost:4001

- JWT_SECRET=sangatrahasia
- JWT_SECRET_REFRESH_TOKEN=sangatrahasiatoken
- JWT_ACCESS_TOKEN_EXPIRED=1d
- JWT_REFRESH_TOKEN_EXPIRED=1d
