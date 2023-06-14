import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = () => {

    const [file, setFile] = useState(null);

    //alowed types
    const types = ['image/png', 'image/jpeg'];
    const [error, setError] = useState(null); 

    const changedHandler = (e) => {
        //console.log('changed');
        let selected = e.target.files[0]
        
        // check that selected is not empty and is the right type
        if (selected && types.includes(selected.type) ){
            console.log(selected);
            setFile(selected);
            setError('')
        } else {
            setFile(null); 
            setError('Please select an png or jpg file!')
        }
    }

    return (
        <form>
            <label>
                <input type="file" onChange={changedHandler}/>
                <span>+</span>
            </label>
            
            <div className="output">
             { error && <div className='error'>{error}</div> // right side is only triggered when error true 
             }
             { file && <div>{file.name}</div> }
             { file && <ProgressBar file={file} setFile={setFile}/>}
            </div>
        </form>
    )
}

export default UploadForm; 