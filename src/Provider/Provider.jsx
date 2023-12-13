import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext(null);
const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const auth = getAuth(app);

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)


  }



  const profileInfo = (userName, userImage) => {
    updateProfile(auth.currentUser, {
      displayName: userName, photoURL: userImage
    }).then(() => {
      // Profile updated!
      // ...
      console.log('updated')
    }).catch((error) => {
      // An error occurred
      // ...
      console.log(error)
    });
  }


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      const loggedUser = currentUser?.email || user?.email;
      const userEmail = { email: loggedUser };
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {

        //https://food-blog-server.vercel.app
        axios.post("https://food-blog-server.vercel.app/jwt", userEmail, { withCredentials: true })
          .then(res => {
            console.log(res.data);
          })
      }
      else {

        axios.post(`https://food-blog-server.vercel.app/signOut`, userEmail, { withCredentials: true })
          .then(res => console.log(res.data))
      }

    });

    return () => {
      unsubscribe();
    }
  }, [])



  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  const authInfo = {
    user,
    loading,
    createUser,
    profileInfo,
    signIn,
    logOut,
    googleSignIn
  }
  console.log(user)
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default Provider;