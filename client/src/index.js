import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware , compose} from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { } from 'redux-devtools-extension';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);


const store = createStore(rootReducer, enhancer);
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
