import React, { useState, useEffect, useContext, createContext } from 'react';
import Router, { useRouter } from 'next/router';
// import { createUser } from './db';
import {
    getAuth,
    GoogleAuthProvider,
    onIdTokenChanged,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

const AuthContext = createContext({
    user: undefined,
    loading: false,
    signinWithGoogle: () => {},
    signout: () => {},
});

export function AuthProvider({ children }) {
    const auth = useFirebaseAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export const ProtectRoute = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();

    if (user) {
        return children;
    }

    router.push('/');
    return null;
};

function useFirebaseAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleUser = async (rawUser) => {
        if (rawUser) {
            const user = await formatUser(rawUser);
            const { token, ...userWithoutToken } = user;

            // createUser(user.uid, userWithoutToken);
            setUser(user);

            setLoading(false);
            return user;
        } else {
            setUser(false);
            setLoading(false);
            return false;
        }
    };

    const signinWithGoogle = (redirect) => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        return signInWithPopup(auth, provider).then((response) => {
            handleUser(response.user);

            if (redirect) {
                Router.push(redirect);
            }
        });
    };

    const signout = () => {
        const auth = getAuth();
        return signOut(auth).then(() => handleUser(false));
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onIdTokenChanged(auth, handleUser);
        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
        signinWithGoogle,
        signout,
    };
}

const formatUser = async (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    };
};
