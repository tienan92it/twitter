/**
 * Created by AnTran on 4/3/17.
 */
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'

import Images from '../../config/Images'

const TimelineItem = (props) => {

    const { avatarUri, name, status, retweet, favorited } = props

    return (
        <View style={styles.container}>
            <Image style={styles.avatar}
                   source={{uri: avatarUri}}/>
            <View style={styles.contentInfo}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.status}>{status}</Text>
                <View style={styles.statusAction}>
                    <Image style={styles.statusActionIcon}
                           source={Images.RetweetIcon}/>
                    <Text style={styles.statusActionNumber}>{retweet}</Text>
                    <Image style={styles.statusActionIcon}
                           source={Images.HeartIcon}/>
                    <Text style={styles.statusActionNumber}>{favorited}</Text>
                </View>
            </View>
        </View>
    )

    TimelineItem.propsType = {
        avatarUri: React.PropTypes.string,
        name: React.PropTypes.string,
        status: React.PropTypes.string,
        retweet: React.PropTypes.number,
        favorited: React.PropTypes.number
    }

    TimelineItem.defaultProps = {
        avatarUri: '',
        name: '',
        status: '',
        retweet: 0,
        favorited: 0
    }
}

export default TimelineItem