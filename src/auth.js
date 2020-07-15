import store from './store';

export function cleanUpSession() {
  return store.dispatch('clearAuthentication');
}

export function clientLogin(token) {
  return store.dispatch('clearAuthentication').then(() => {
    return store.dispatch('setToken', token)
      .then(() => 
        store.dispatch('setAuthenticated', true))
      .catch((error) => {
        console.error('Error on cache reset during login', error);
        return cleanUpSession();
      })
  });
}

export function clientLogout() {
  return store.dispatch('clearAuthentication')
  .then(function() {
    this.$router.push('login');
  })
  .catch(function(error) {
    return error;
  });
}
