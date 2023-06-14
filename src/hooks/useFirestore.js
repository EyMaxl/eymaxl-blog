import { useState, useEffect } from 'react'
import { projectFirestore } from '../firebase/config'
//import { collection } from 'firebase/firestore'
import { collection as fsCollection, query, orderBy, onSnapshot } from "firebase/firestore";


const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);
    
    useEffect(() => {

        const collectionRef = fsCollection(projectFirestore, collection);
        const orderedQuery = query(collectionRef, orderBy('createdAt', 'desc') )
        const unsub = onSnapshot(orderedQuery, (snapshot) => { // Snap takes a snapshot of all the documents inside the database
            let documents = [];
            snapshot.forEach(doc => {
                documents.push({...doc.data(), id: doc.id})  // gets the data inside the doc
            });
            setDocs(documents)
        });   
        
          
        // clean up function
        return () => unsub(); 

    }, [collection]) // if the collection changes, a new snapshot is taken 


    return {docs};
}

export default useFirestore; 