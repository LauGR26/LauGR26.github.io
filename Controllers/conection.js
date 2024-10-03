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

  import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,   
    orderBy  
  } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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

// Función para agregar un registro a Firestore
export const Addregister = async (cod, name, desc, cant) => {
  try {
    const docRef = await addDoc(collection(db, "productos"), {
      codigo: cod,
      nombre: name,
      descripcion: desc,
      cantidad: cant
    });
    console.log("Documento escrito con ID: ", docRef.id);
    return docRef.id; // Retornar el ID del documento registrado
  } catch (error) {
    console.error("Error al agregar el documento: ", error);
    throw error; // Lanzar el error para manejarlo en el registro
  }
};

// Función para obtener productos de Firestore
export const obtenerProductos = async () => {
  try {
      const productosCollection = collection(db, "productos");
      const productosSnapshot = await getDocs(productosCollection);
      const productosList = productosSnapshot.docs.map(doc => ({
          id: doc.id, // Agregar ID del documento
          ...doc.data() // Obtener datos del documento
      }));
      return productosList; // Retornar la lista de productos
  } catch (error) {
      console.error("Error al obtener productos: ", error);
      throw error; // Lanzar el error para manejarlo
  }
}