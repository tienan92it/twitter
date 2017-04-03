/**
 * Created by AnTran on 4/2/17.
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    panel: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    panelTop: {
        flex: 0.25,
        flexDirection: 'row',
        backgroundColor: "#00a7eb",
        alignItems: "center",
        justifyContent: "center"
    },
    panelBody: {
        flex: 0.75,
        margin: 30
    },
    avatar: {
        flex: 0.5,
        width: "50%",
        height: "50%",
        resizeMode: "contain"
    },
    name: {
        flex: 0.5,
        fontSize: 20,
        color: "#fff",
        textAlign: "left"
    },
    itemMenu: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    iconMenu: {
        width: 20,
        height: 20,
        flex: 0.2,
        resizeMode: "contain"
    },
    titleMenu: {
        flex: 0.8
    },
    loadingIndicator: {
        width: "100%",
        height: "100%",
        backgroundColor: '#ff000000',
        borderRadius: 5,
        position: 'absolute',
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})