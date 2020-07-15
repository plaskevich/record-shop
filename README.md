# Record Shop

In order to use it locally, run the server first.

Server itself and instructions you can find [here](https://github.com/plaskevich/record-shop-server).

## Run app locally
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

To be able to use the app properly, you would need an already created account.
Feel free to contact me about this
