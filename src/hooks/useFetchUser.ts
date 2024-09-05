import { AuthContext } from "../context/AuthContext";
import { useState, useContext, useEffect } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

type UserDetails = {};

export const useFetchUser = () => {
  // context api
  const { user }: {} | null | any = useContext(AuthContext);

  const [userState, setUserState] = useState<UserDetails | null | any>();
  const [error, setError] = useState<null | string>();
  const [loading, setLoading] = useState(false);

  const docRef = doc(db, "user", `${user.email}`);

  useEffect(() => {
    onSnapshot(
      docRef,
      (userFound) => {
        setUserState({ ...userFound.data() });
      },
      (error) => {
        setError(error.code);
      }
    );
  }, [user.email]);

  const sideEffects = {
    loading,
    error,
  };

  return { ...sideEffects, userState };
};
