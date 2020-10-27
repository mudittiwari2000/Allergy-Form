import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDQ_sP1ZxVzBkDy8wKdDLWMPPeD8ZHBGxQ",
  authDomain: "allergy-form-2c19c.firebaseapp.com",
  databaseURL: "https://allergy-form-2c19c.firebaseio.com",
  projectId: "allergy-form-2c19c",
  storageBucket: "allergy-form-2c19c.appspot.com",
  messagingSenderId: "869132154036",
  appId: "1:869132154036:web:00a827a299c531072a53e1",
};

firebase.initializeApp(config);

export default firebase;
