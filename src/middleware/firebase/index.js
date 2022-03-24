import {initializeApp} from 'firebase/app';
import {getDatabase,push, ref, set, update, onValue, child, get, remove} from "firebase/database";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import firebase from "firebase/app";


// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBx-CU6hrpI9JZWvgkGBhmtu8Fq5AHJOYI",
    authDomain: "tok-tokapp.firebaseapp.com",
    databaseURL: "https://tok-tokapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tok-tokapp",
    storageBucket: "tok-tokapp.appspot.com",
    messagingSenderId: "426483539736",
    appId: "1:426483539736:web:bb87c25db45a74aa18086d"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const DB = getDatabase(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
const dbRef = ref(getDatabase());


export default {
    auth,
    DB,
    ref,
    dbRef,
    onValue,
    child,
    set,
    get,
    update,
    remove,
    push,
    app,
    firebase,
    provider,
    GoogleAuthProvider,
    signInWithPopup
};
