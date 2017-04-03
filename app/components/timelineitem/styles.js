/**
 * Created by AnTran on 4/3/17.
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        margin: 10,
    },
    avatar: {
        width: 70,
        height: 70,
        resizeMode: "contain",
        flex: 0.2
    },
    contentInfo: {
        flexDirection: "column",
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
        flex: 0.8
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000"
    },
    status: {
        fontSize: 16,
        color: "#000",
        marginTop: 20,
        marginBottom: 15
    },
    statusAction: {
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    statusActionIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    statusActionNumber: {
        fontSize: 12,
        color: 'gray',
        textAlign: "center",
        marginLeft: 5,
        marginRight: 30
    }
})