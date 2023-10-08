import React, { useEffect, useState } from 'react';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase-config';
import axios from 'axios';

const AuthComponent = () => {
  const [user, setUser] = useState(null);


  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      console.log("connecté : " + idToken);
      
      console.log("ID de l'utilisateur : " + result.user.uid);
  
      axios.post('http://localhost:5000/api/user-id', { idToken: idToken })
        .then(response => {
          console.log("Réponse du serveur : ", response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la requête POST :', error);
        });
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <img src={user.photoURL} alt={user.displayName} />
          <p>Connecté en tant que {user.displayName}</p>
          <button onClick={signOutUser}>Se déconnecter</button>
        </div>
      ) : (
        <div>
          <button onClick={signIn}>Se connecter avec Google</button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
