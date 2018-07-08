import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import Application from 'components/application'
import Chrono from 'models/chrono'
import { List } from 'immutable'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import accountsReducer from 'reducers/accounts-reducer'
import chronoReducer from 'reducers/chrono-reducer'
import moment from 'moment'
import splitsReducer from 'reducers/splits-reducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  accounts: accountsReducer,
  chrono: chronoReducer,
  splits: splitsReducer,
})

const states = {
  accounts: List(),
  chrono: new Chrono(moment().subtract(1, 'year'), moment()),
  splits: List(),
}

const storeEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore( reducers, states, storeEnhancers)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={ store }><Application /></Provider>,
    document.body.appendChild(document.createElement('div'))
  )
})
