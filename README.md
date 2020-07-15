# Record Shop

This is a web app used for managing inventory in a record shop.

A record data can be added manually or imported from [Discogs](https://www.discogs.com/) (one of the biggest music databases).


## Run app locally
In order to use it locally, run the server first.

Server itself and instructions you can find [here](https://github.com/plaskevich/record-shop-server).
### 1. Install dependencies
`yarn install`
### 2. Set credentials
1. In the root of the project create a file named `.env`
2. Set the `.env` file with credentials:
```
VUE_APP_GRAPHQL_HTTP=<server_url>
```
Replace `<server_url>` with the URL of the server that should be running also locally (e.g. http://localhost:3000/)

### 3. Start app
`yarn serve`

