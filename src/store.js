import {createStore,combineReducers,compose} from 'redux';
import  firebase from 'firebase';
import 'firebase/firestore';
import {reactReduxFirebase,firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore,firestoreReducer} from 'redux-firestore';
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
    apiKey: "AIzaSyComqlaGrlw2Tz_rAy9_pDJLPN-YqsOnLk",
    authDomain: "react-client-b3ed8.firebaseapp.com",
    databaseURL: "https://react-client-b3ed8.firebaseio.com",
    projectId: "react-client-b3ed8",
    storageBucket: "react-client-b3ed8.appspot.com",
    messagingSenderId: "752144848072",
    appId: "1:752144848072:web:d3684568c5469cd2"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

//Initialize firebase instance
firebase.initializeApp(firebaseConfig);

//Initialize firestore instance
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), 
     reduxFirestore(firebase) 
  )(createStore)

  // Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify:notifyReducer,
    settings:settingsReducer
  })

  // Check for settings in local storage
 if(localStorage.getItem('settings')=== null) {
   // Default Settings
   const defaultSettings = {
    disableBalanceOnAdd:true,
    disableBalanceOnEdit:false,
    allowRegistration:false
   }

   //Set to local storage
   localStorage.setItem('settings',JSON.stringify(defaultSettings))
 } 

  //Create initial state
  const initialState = {settings:JSON.parse(localStorage.getItem('settings'))}

  //Create Store
  const store = createStoreWithFirebase(rootReducer,initialState,
    compose(reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

    export default store;