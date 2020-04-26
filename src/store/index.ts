import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createSagaMiddleware from 'redux-saga';
import rootReducer from './redux/rootReducer';
import rootSaga from './redux/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: '@rwr',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

const persistedStore = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistedStore };
