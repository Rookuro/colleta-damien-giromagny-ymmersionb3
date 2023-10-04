import React from "react";
import { app } from "../firebase-config";
import { useRouter } from "next/router";
import styles from '../styles/Login.module.css';
import Connexion from '../public/connexion.png';
import Image from 'next/image';
import { userAccessToken, fetchUser } from '../utils/fetchUserDetails';
import { useEffect, useState, useRef } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

export default function AuthComponent() {
  const [user, setUser] = useState(null);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Erreur de connexion :', error);
    }
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error('Erreur de déconnexion :', error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {user ? (
        <div className={styles.connected}>
          <picture>
            <source srcSet={user.photoURL} type="image/webp" />
            <img src={user.photoURL} alt="" className="rounded-md shadow-md absolute top-0 right-17 cursor-pointer taille" layout="fill" />
          </picture>
          <button onClick={signOutUser}>Se déconnecter</button>
        </div>
      ) : (
        <div className={styles.button} onClick={signIn}>
          <Image src={Connexion} width={40} height={40} />
          <div className={styles.text} onClick={signIn}>
            <p className="">Se connecter</p>
          </div>
        </div>
      )}
    </>
  );
}