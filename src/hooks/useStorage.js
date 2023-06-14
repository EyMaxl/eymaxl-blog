import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, serverTimestamp, addDoc  } from "firebase/firestore";


const useStorage = (file) => {
    const [progress, setProgress] = useState(0); 
    const [error, setError] = useState(null); 
    const [url, setUrl] = useState(null); 
     
    useEffect(() => {
        // references
        const storageRef = ref(projectStorage, file.name);
        //const collectionRef = projectFirestore.collection('images');
        const collectionRef = collection(projectFirestore, 'images');


        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
          (snapshot) => {
            // Handle the upload state change here.
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          }, (error) => { // Handle unsuccessful uploads 
            setError(error);
          }, () => { // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const createdAt = serverTimestamp();
                //collectionRef.add({url, createdAt});
                setUrl(downloadURL);
                addDoc(collectionRef, {url: downloadURL, createdAt});
                
            });
          }
        );
      }, [file]);
       
           

        /*

        storageRef.put(file).on('state_changed', (snap) => {
            // percentage of the upload
            let percentage = (snap.byteTransferred / snap.totalBytes) * 100;
            setProgress(percentage); 

        }, (err) => {
            setError(err); 
        }, async () => {
            const url = await storageRef.getDownloadURL(); 
            setUrl(url);
        }); 

    }, [file])*/

    return { progress, url, error }
}

export default useStorage; 