const firebaseConfig = {
  apiKey: "AIzaSyCu5w2jnXncEKJtUn-BtvzC0KD8zSfBs8E",
  authDomain: "index-d301d.firebaseapp.com",
  databaseURL: "https://index-d301d-default-rtdb.firebaseio.com",
  projectId: "index-d301d",
  storageBucket: "index-d301d.firebasestorage.app",
  messagingSenderId: "626792561473",
  appId: "1:626792561473:web:f136777844d68e9018bfc0",
  measurementId: "G-F15MVDGV0V"
};
//intialize firebase
firebaseConfig.intializeApp(firebaseConfig);
const auth=firebase.auth()
console.log ('conncected to firebase')

