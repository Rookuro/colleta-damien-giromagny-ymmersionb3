import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase-config"; // Assurez-vous que la configuration Firebase est correctement importée
import { useRouter } from "next/router";
import styles from '../styles/Login.module.css';
import Connexion from '../public/connexion.png';
import Image from 'next/image';
import { userAccessToken, fetchUser } from '../utils/fetchUserDetails';
import { useEffect, useState, useRef } from 'react';

const Login = () => {
  const firebaseAuth = getAuth(app); // Obtenez l'objet d'authentification Firebase
  const provider = new GoogleAuthProvider(); // Utilisez GoogleAuthProvider
  const router = useRouter();
  
  // Fonction de connexion
  const signIn = async () => {
    try {
      const { user } = await signInWithPopup(firebaseAuth, provider);
      const { refreshToken, providerData } = user;
      localStorage.setItem('user', JSON.stringify(providerData));
      localStorage.setItem('accessToken', JSON.stringify(refreshToken));
      router.push("/");
    } catch (error) {
      if (error.code === 'auth/cancelled-popup-request') {
        console.error("La demande de connexion a été annulée.");
      } else if (error.code === 'auth/popup-blocked') {
        console.error("Le popup a été bloqué par le navigateur. Assurez-vous que les popups sont autorisés dans le navigateur.");
      } else {
        console.error("Error during sign-in:", error);
      }
    }
  };

  const [user, setUser] = useState(null);

  const timeUser = useRef();

  // Fonction pour vérifier si l'utilisateur est déjà connecté
  const myLogin = async () => {
    const accessToken = userAccessToken();
    if (accessToken) {
      const [userInfo] = fetchUser();
      console.log(userInfo);
      setUser(userInfo);
    }
  };

  timeUser.current = myLogin;

  useEffect(() => {
    timeUser.current();
  }, []);

  // Fonction pour se déconnecter
  const signOut = () => {
    localStorage.clear();
    router.push('/login');
  }

  return (
    <>
      {user ? ( // Vérifiez si l'utilisateur est connecté
        <div className={styles.connected}>
          <picture>
            <source srcSet={user?.photoURL} type="image/webp" />
            <img src={user?.photoURL} alt='' className='rounded-md shadow-md absolute top-0 right-17 cursor-pointer taille' layout='fill' />
          </picture>
          <button onClick={signOut}>Se déconnecter</button>
        </div>
      ) : ( // Si l'utilisateur n'est pas connecté, affichez le bouton de connexion
        <div className={styles.button} onClick={signIn}>
          <Image src={Connexion} width={40} height={40} />
          <div
            className={styles.text}
            onClick={signIn}>
            <p className="">Se connecter</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;


// import React, { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import { useRouter } from "next/router";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import { app } from "../firebase-config";

// const Login = () => {
//   const [user, setUser] = useState(null);
//   const router = useRouter();
//   const firebaseAuth = getAuth(app);

//   useEffect(() => {
//     // Vérifiez si l'utilisateur est déjà connecté
//     onAuthStateChanged(firebaseAuth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });
//   }, []);

//   const handleSignOut = async () => {
//     try {
//       await signOut(firebaseAuth);
//       setUser(null);
//       router.push("/login"); // Redirigez l'utilisateur vers la page de connexion
//     } catch (error) {
//       console.error("Error during sign-out:", error);
//     }
//   };

//   const uiConfig = {
//     signInFlow: "popup",
//     signInOptions: [
//       // Liste des fournisseurs d'authentification (Google, Facebook, etc.)
//       // Exemple pour Google :
//       {
//         provider: app.auth.GoogleAuthProvider.PROVIDER_ID,
//         customParameters: {
//           // Définissez ici des paramètres personnalisés si nécessaire
//         },
//       },
//     ],
//     callbacks: {
//       // Callbacks en cas de succès de la connexion
//       signInSuccessWithAuthResult: () => {
//         router.push("/");
//         return false; // Rediriger manuellement
//       },
//     },
//   };

//   return (
//     <div>
//       {user ? (
//         <div>
//           <img src={user.photoURL} alt={user.displayName} />
//           <button onClick={handleSignOut}>Se déconnecter</button>
//         </div>
//       ) : (
//         <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
//       )}
//     </div>
//   );
// };

// export default Login;
