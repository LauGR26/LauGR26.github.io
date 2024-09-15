import {
  initializeApp 
} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';

import {
   getAuth,
   signInWithEmailAndPassword,
   onAuthStateChanged,
   signOut,
   createUserWithEmailAndPassword, 
   sendEmailVerification,
   sendPasswordResetEmail

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
export const ctrlaccessuser=(email,password)=>
  signInWithEmailAndPassword(auth, email, password)
  
  
  //observador
  export function userstate(){
    onAuthStateChanged(auth, (user) => {
    if (user) {
    const uid = user.uid;
    console.log("usuario: "+uid)
    } else {
    window.location.href="../index.html"
    }
    });
    }

  //Cerrar sesión
  export const logout=()=>signOut(auth)

 //Registarar Usuario Nuevo
 export const registerauth  =(email, password)=>
  createUserWithEmailAndPassword(auth, email, password)

  //Verificar usuario
  export const verification=()=>
    sendEmailVerification(auth.currentUser)

  //restablecer contraseña
  export const verificationcod=(email)=>
    sendPasswordResetEmail(auth, email)

  // Obtener el usuario actualmente autenticado
  export function getCurrentUser() {
    const user = auth.currentUser;
    return user ? { email: user.email } : null;
}