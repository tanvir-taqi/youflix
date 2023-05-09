import { createContext, useEffect, useState } from "react";
import React, { ReactNode } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from 'firebase/auth'
import { app } from "../firebase/firebase.config";

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    createUser: (email: string, password: string) => Promise<any>;
    login: (email: string, password: string) => Promise<any>;
    socialLogin: (socialProvider: any) => Promise<any>;
    logOut: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
const auth = getAuth(app);

interface UserContextProps {
    children: ReactNode;
}

const UserContext = ({ children }: UserContextProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // user sign up 
    const createUser = (email: string, password: string) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // user log in
    const login = (email: string, password: string) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // log out user 
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }



    // login with social site like google
    const socialLogin = (socialProvider: any) => {
        setLoading(true);
        return signInWithPopup(auth, socialProvider)

    }

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo: AuthContextProps = {
        user,
        loading,
        setLoading,
        createUser,
        login,
        socialLogin,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
    }
    export default UserContext;