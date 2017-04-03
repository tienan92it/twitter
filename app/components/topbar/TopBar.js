/**
 * Created by AnTran on 4/2/17.
 */
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'

const TopBar = (props) => {
    const { leftIcon, title, leftAction } = props

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{flex: 0.1}} onPress={leftAction}>
                <Image style={styles.leftIcon}
                       source={leftIcon}/>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>

    )

    TopBar.propTypes = {
        leftIcon: React.PropTypes.object,
        title: React.PropTypes.string,
        leftAction:React.PropTypes.func
    };

    TopBar.defaultProps = {
        leftIcon: {},
        title: '',
        leftAction: () => console.log('On Left button Click')
    };
}

export default TopBar