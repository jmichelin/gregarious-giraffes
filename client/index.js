import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, browserHistory, Route} from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './store/configureStore.js';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>
    , document.getElementById('app'));


