import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./Navigation').reducer,
  login: require('./Login').reducer,
  signup: require('./Signup').reducer,
  credential: require('./Credential').reducer,  // Store id and token of user
  asyncRequest: require('./AsyncRequest').reducer,  // Handle asynchronous request, show spinner...
  configs: require('./Configs').reducer, // Store all configs for app
  customer: require('./Customer').reducer, // Store data of user after logging in
  artist: require('./Artist').reducer, // List all artists, list search artists, detail artist
  service: require('./Service').reducer, // List all available services
  review: require('./Review').reducer, // Store data for writing review
  search: require('./Search').reducer, // Store search condition
  address: require('./Address').reducer, // Store address info to edit or ad new
  forgotPassword: require('./ForgotPassword').reducer, // Store all data booking
});

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(
    reducers,
    rootSaga,
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};
