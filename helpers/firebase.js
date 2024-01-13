import { firebase } from '@react-native-firebase/app';

const firebaseConfig = {
   apiKey: 'AIzaSyADLTdORs4IoJxW_BZ2VeTUDda7s-gboaM',
   authDomain: 'herrands-efbcb.web.app',
   projectId: 'herrands-efbcb',
   storageBucket: 'herrands-efbcb.appspot.com',
   messagingSenderId: '691084502940',
   appId: '1:626675653937:ios:efc7d362e2a8d27357e410',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}