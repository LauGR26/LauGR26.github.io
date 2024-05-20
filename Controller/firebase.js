import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  deleteUser as authDeleteUser,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js'
import { 
  getFirestore,
  collection, 
  addDoc,
  getDocs,
  doc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz7hXR9V90rNSlvFqyalbJyo-Y6gTZ59k",
  authDomain: "apiweb2024-f4a1d.firebaseapp.com",
  databaseURL: "https://apiweb2024-f4a1d-default-rtdb.firebaseio.com",
  projectId: "apiweb2024-f4a1d",
  storageBucket: "apiweb2024-f4a1d.appspot.com",
  messagingSenderId: "205317274919",
  appId: "1:205317274919:web:07469e5be46da0d19a7d02",
  measurementId: "G-DDPXZ4WP3L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export const registerauth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

export const verification = () =>
  sendEmailVerification(auth.currentUser)

export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const googleauth = (provider) =>
  signInWithPopup(auth, provider)

export const facebookauth = (provider) =>
  signInWithPopup(auth, provider)

export function userstate(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid)
    } else {
      window.location.href='../Index.html'
    }
  });
}

export const recoverypass = (email) =>
  sendPasswordResetEmail(auth, email)

export const loginout = () =>
  signOut(auth)

export const deleteuser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (user) {
      await authDeleteUser(user);
      const userRef = doc(db, "Usuarios", user.uid);
      await deleteDoc(userRef);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { auth };


export const addregister = (nombres, apellidos, fecha, cedula, telefono, direccion, email, tipoCuenta) =>
  addDoc(collection(db, "Usuarios"), {
    nombre: nombres,
    apellido: apellidos,
    fecha: fecha,
    cedula: cedula,

    telefono: telefono,
    direccion: direccion,
    email: email,
    tipoCuenta: tipoCuenta  
  });

export const viewproducts = () =>
  getDocs(collection(db, "Usuarios"));
