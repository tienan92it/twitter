/**
 * Created by AnTran on 3/29/17.
 */
import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import Styles from './styles'
import Images from '../../config/Images'

import {connect} from 'react-redux';
import {actionCreators} from "../../reducer/reducer";

import {twitter} from 'react-native-simple-auth'

import Home from '../home/Home'


const twitter_id = {
    appId: 'luW29n3W5dSbEI00yn9eoOVsp',
    appSecret: 'lMVsq5mPVMk7KMQY49TU9eLjnTA2I6qqPYjfDYk0J3Fam4CIoJ',
    callback: 'coderschoolw2://authorize',
}

class Login extends Component {

    constructor(props) {
        super(props)

        this.onIconClick = this.onIconClick.bind(this)

        this.state = {
            twitterIcon: Images.TwitterIcon,
            twitterStyle: Styles.iconCenter
        }
    }

    componentDidMount() {
    }

    onLogin = (dispatch, navigator) => {
        twitter(twitter_id).then((info) => {
            console.log(JSON.stringify(info))
            dispatch(actionCreators.storeUser({userInfo: info.user, userToken: info.credentials}));
            navigator.push({
                title: "Home",
                component: Home
            })
        }).catch((error) => {
            alert(JSON.stringify(error))
        });
    }

    onIconClick = () => {
        this.setState({
            twitterIcon: Images.IconFlyIn,
            twitterStyle: Styles.iconFly
        })


        setTimeout(() => {
            this.setState({
                twitterIcon: Images.TwitterDead,
                twitterStyle: Styles.iconCenter
            })
        }, 2000)
    }

    render() {
        const {navigator, dispatch} = this.props

        return(
            <View style={Styles.container}>
                <TouchableOpacity onPress={this.onIconClick}>
                    <Image style={this.state.twitterStyle}
                           source={this.state.twitterIcon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onLogin(dispatch, navigator)}>
                    <Text style={Styles.loginButton}>Login</Text>
                </TouchableOpacity>
            </View>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        dataUser : state.searchReducer.params
    }
}

export default connect(mapStateToProps)(Login);