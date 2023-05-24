import { useEffect, useState } from "react";
import { projectAuth } from '../firebase/config';
import { useAuthContext } from "./useAuthContext";

export const useLogin = ()=>{
    const [isCanceled, setIsCanceled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async(email, password) =>{
        setError(null);
        setIsPending(true);

        //login the user
        try{
            const res = await projectAuth.signInWithEmailAndPassword(email, password);

            dispatch({type:'LOGIN', payload: res.user}); 

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
        return ()=>{//cleanup
            setIsCanceled(true);
        }
    }, [])


    return{ login, error, isPending }

}