/**
 * Created by AnTran on 3/29/17.
 */
import React from 'react';
import {
    Navigator
} from 'react-native';

import {Provider} from 'react-redux';
import reducers from './reducer/reducer';

import { createStore } from 'redux';
const store = createStore(reducers);

import Login from './layouts/login/Login'
import Home from './layouts/home/Home'


const defaultRoute = {
    title: 'Login',
    component: Login
}

const Twitter = (props) => {
    return (
        <Provider store={store}>
            <Navigator
                initialRoute={defaultRoute}
                renderScene={(route, navigator) => {
                    return <route.component route={route} navigator={navigator}/>
                }}/>
        </Provider>
    )
}

export default Twitter