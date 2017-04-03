/**
 * Created by AnTran on 4/2/17.
 */
import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator,
    ListView
} from 'react-native';
import Styles from './styles'
import Images from '../../config/Images'

import {connect} from 'react-redux';
import {actionCreators} from "../../reducer/reducer";

import Drawer from 'react-native-drawer'
import TopBar from '../../components/topbar/TopBar'
import TimelineItem from '../../components/timelineitem/TimelineItem'
import {getHeaders} from '../../config/oauth1'

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
}

class Home extends Component {

    constructor(props) {
        super(props)

        this.onMenuItemPress = this.onMenuItemPress.bind(this)

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            avatarUri: '',
            userInfo: (this.props.dataUser) ? this.props.dataUser.userInfo : "",
            dataSource: ds.cloneWithRows([]),
            menuList: ds.cloneWithRows([]),
            currentTitle: 'Home',
            isLoading: false
        }
    }

    componentDidMount() {
        this.getHomeTimeline()
        this.setState({
            menuList: this.state.menuList.cloneWithRows([{icon: Images.HomeIcon, title: 'Home'},
                {icon: Images.PersonIcon, title: 'My Timeline'}])
        })

    }

    getUserTimeline = () => {
        fetch('https://api.twitter.com/1.1/statuses/user_timeline.json', {
            headers: getHeaders("https://api.twitter.com/1.1/statuses/user_timeline.json",
                {}, {}, "luW29n3W5dSbEI00yn9eoOVsp", "lMVsq5mPVMk7KMQY49TU9eLjnTA2I6qqPYjfDYk0J3Fam4CIoJ",
                'GET',
                this.props.dataUser.userToken.oauth_token,
                this.props.dataUser.userToken.oauth_token_secret)
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(JSON.stringify(response))
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(response),
                isLoading: false
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    getHomeTimeline = () => {
        fetch('https://api.twitter.com/1.1/statuses/home_timeline.json', {
            headers: getHeaders("https://api.twitter.com/1.1/statuses/home_timeline.json",
                {}, {}, "luW29n3W5dSbEI00yn9eoOVsp", "lMVsq5mPVMk7KMQY49TU9eLjnTA2I6qqPYjfDYk0J3Fam4CIoJ",
                'GET',
                this.props.dataUser.userToken.oauth_token,
                this.props.dataUser.userToken.oauth_token_secret)
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(JSON.stringify(response))
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(response),
                isLoading: false
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

    onMenuItemPress(title) {
        this.closeControlPanel()
        if (title != this.state.currentTitle){
            this.setState({
                currentTitle: title,
                isLoading: true
            })
            switch (title) {
                case 'Home':
                    this.getHomeTimeline()
                    break
                case 'My Timeline':
                    this.getUserTimeline()
                    break
                default:
                    return
            }
        }
        // this.getUserTimeline()
    }
    render() {

        let controlPanel = (<View style={Styles.panel}>
            <View style={Styles.panelTop}>
                <Image style={Styles.avatar}
                       source={{uri: this.state.userInfo.profile_image_url_https}}/>
                <Text style={Styles.name}>{this.state.userInfo.name}</Text>
            </View>
            <ListView
                style={Styles.panelBody}
                dataSource={this.state.menuList}
                enableEmptySections={true}
                renderRow={(rowData) => <TouchableOpacity onPress={() => this.onMenuItemPress(rowData.title)}
                                                          style={Styles.itemMenu}>
                                                <Image style={Styles.iconMenu}
                                                       source={rowData.icon}/>
                                                <Text style={Styles.titleMenu}>{rowData.title}</Text>
                                        </TouchableOpacity>}
                renderSeparator={this.renderMenuSeparator}
            />
        </View>)
        let mainContent = (this.state.isLoading) ? (<ActivityIndicator animating={true}
                                                                 color='#000000'
                                                                 style={Styles.loadingIndicator}
                                                                 size="large" />) :
                                            (<View style={Styles.container}>
                                                <TopBar leftIcon={Images.HamburgerIcon}
                                                        title="Twitter"
                                                        leftAction={() => this.openControlPanel()}/>
                                                <ListView
                                                    dataSource={this.state.dataSource}
                                                    enableEmptySections={true}
                                                    renderRow={(rowData) => <TimelineItem avatarUri={rowData.user.profile_image_url_https}
                                                                                          name={rowData.user.name}
                                                                                          status={rowData.text}
                                                                                          retweet={rowData.retweet_count}
                                                                                          favorited={rowData.favorite_count}/>}
                                                    renderSeparator={this.renderSeparator}
                                                />
                                            </View>)

        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="displace"
                content={controlPanel}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}
            >
                {mainContent}
            </Drawer>
        )
    }

    renderSeparator(sectionID, rowID) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: .5,
                    backgroundColor: 'gray',
                    marginLeft: 10
                }}
            />
        )
    }

    renderMenuSeparator(sectionID, rowID) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: .5,
                    backgroundColor: 'black',
                    marginLeft: 20,
                    marginRight: 20
                }}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataUser : state.searchReducer.params
    }
}

export default connect(mapStateToProps)(Home);