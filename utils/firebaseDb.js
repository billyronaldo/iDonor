import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAS-JtCorb5aHHq7gwDBUnAEsrKAZ_T08k",
  authDomain: "skripsi-7452e.firebaseapp.com",
  projectId: "skripsi-7452e",
  storageBucket: "skripsi-7452e.appspot.com",
  messagingSenderId: "985258501370",
  appId: "1:985258501370:web:d7ac470a02b516c224d543",
  measurementId: "G-PZC2BFEQ1G"
};


if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

firebase.firestore().settings({
  experimentalForceLongPolling: true
});


export default firebase;