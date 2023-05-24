import { useState, useEffect } from "react";
import { projectAuth } from '../firebase/config';
import { useAuthContext } from "./useAuthContext";

export const useSignup = () =>{
    const [isCanceled, setIsCanceled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName)=>{
        setError(null);
        setIsPending(true);
        
        try{            
            const response = await projectAuth.createUserWithEmailAndPassword(email, password);

            if(!response){
                throw new Error('Could not complete signup')
            }

            await response.user.updateProfile({displayName: displayName});

            //dispatch
            dispatch({ type: 'LOGIN', payload: response.user});
            
            if(!isCanceled){
                setIsPending(false);
                setError(null);
            }
        }
        catch(err){
            if(!isCanceled){
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(()=>{
        return ()=>{
            setIsCanceled(true)
        }
    }, [])

    return{ error, isPending, signup }
}