import { createStore, applyMiddleware, Middleware, compose } from 'redux'
// import { rootReducer } from './reducers/root.reducer'

/** redux middlewares */
import thunk from 'redux-thunk'
import rootReducer from './reducers/root.reducer'
/** end: redux middlewares */

const middleware: Middleware[] = [thunk]
// if (__DEV__) {
//   const { logger } = require('redux-logger')

//   middleware.push(logger)
// }

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = composeEnhancers(applyMiddleware(...middleware))

const store = createStore(rootReducer, middlewares)

export { store }
