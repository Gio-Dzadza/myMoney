import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action)=>{
    switch (action.type){
        case 'IS_PENDING':
            return { 
                isPending: true,
                document: null, 
                success: false, 
                error: null 
            } 
        case 'ADDED_DOCUMENT':
            return {
                isPending: false, 
                document: action.payload, 
                success: true, 
                error: null
            }
        case 'DELETED_DOCUMENT':
            return {
                isPending:false, 
                document: null,
                success: true,
                error: null
            }
        case 'ERROR':
            return {
                isPending: false, 
                document: null, 
                success: false, 
                error: action.payload
            }
        default:
            return state
    }
}

export const useFirestore = (collection)=>{
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCanceled, setIsCanceled] = useState(false);
    const ref = projectFirestore.collection(collection);
    //cleanup funqcia
    const dispatchIfNotCanceled = (action)=>{
        if(!isCanceled){
            dispatch(action);
        }
    }
    //documentis damateba
    const addDocument = async (doc) =>{
        dispatch({ type: 'IS_PENDING' });
        try{
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({...doc, createdAt})
            dispatchIfNotCanceled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
        }
        catch(err){
            dispatchIfNotCanceled({ type: 'ERROR', payload:err.message })
        }
    }
    //documentis washla
    const deleteDocument = async(id)=>{
        dispatch({type: "IS_PENDING"});
        try{
            await ref.doc(id).delete();
            dispatchIfNotCanceled({ type: 'DELETED_DOCUMENT'})
        }
        catch(err){
            dispatchIfNotCanceled({type: 'ERROR', payload: 'could not delete'})
        }
    }

    
    useEffect(()=>{

        setIsCanceled(false);

        return ()=>{
            setIsCanceled(true);
        }
    },[])

    return { addDocument, deleteDocument, response }
}