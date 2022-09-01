// ...
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from "redux-persist";
import sagaRoot from '../api/sagaRoot';
import reducerRoot from '../api/reducerRoot';

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();
// Redux: Store
const StoreRoot = createStore(
  reducerRoot,
  applyMiddleware(
    sagaMiddleware,
  ),
);
// Middleware: Redux Saga
sagaMiddleware.run(sagaRoot);
// Can still subscribe to the store
const persistor = persistStore(StoreRoot);
export { StoreRoot,persistor };

//const action = type => store.dispatch({type})

// rest unchanged