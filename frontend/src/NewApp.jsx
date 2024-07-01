import { useState, useRef } from 'react'
import axios from 'axios';
import './App.css'

export default function App() {
    const inputRef = useRef(null);

    const [ type, setType ] = useState(0)


    const types = [
        'Video',
        'Playlist'
    ]

    const handleOnClick = async () => {
        const path = `http://localhost:8000/download/video/${inputRef.current.value}`;
        console.log(path);

        axios.post(path)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        inputRef.current.value = ''
    };

    const handleOptionClick = (selected) => {
        setType(selected);
    };

    return (

    <div className='container'>
        <h1>YouTube Downloader</h1>
        <div className='choice'>
            {types.map((typeName, index) => 
            <span 
                className={`option${index === type ? ' selected' : ''}`} 
                key={index} 
                onClick={() => handleOptionClick(index)}>
                    {typeName}
            </span>
            )}
        </div>
        <div className="card">
            <input type="text" placeholder={`Enter ${types[type]} Link`} ref={inputRef}></input>
            <button onClick={handleOnClick}>
                Download
            </button>
        </div>
    </div>

)
}