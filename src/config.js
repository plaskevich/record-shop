
export default {
  graphqlURL: process.env.NODE_ENV === 'DEV' ? process.env.VUE_APP_GRAPHQL_HTTP : 'https://record-shop-server.herokuapp.com/'
}