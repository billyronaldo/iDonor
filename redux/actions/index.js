import firebase from 'firebase'
import {USER_STATE_CHANGE, USER_LOCATION, } from '../constants/index'

require('firebase/firestore')


export function fetchUser(){
    return ((dispatch) => {
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists){
                console.log(snapshot.data())
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
            }
            else{
                console.log('do not exists')
            }
        })
    })
}