import {
  initializeApp 
} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';

import {
   getAuth,
   signInWithEmailAndPassword,
   onAuthStateChanged,

   } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyATB6bpyNNDLlgCZD7rTfELgU9mPmYt8q0",
  authDomain: "desnube2024-f60fa.firebaseapp.com",
  projectId: "desnube2024-f60fa",
  storageBucket: "desnube2024-f60fa.appspot.com",
  messagingSenderId: "329333144479",
  appId: "1:329333144479:web:92470e7e43466f6e9e9baa",
  measurementId: "G-GXK61LVEWH"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Metodo de autenticaciòn de usuario
export const accesuser=(email,password)=>
  signInWithEmailAndPassword(auth, email, password)
  
//Verificacion de logeo
export const userstate=()=>
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("usuario: "+uid)
    } else {
      window.location.href="/index.html"
    }
  });