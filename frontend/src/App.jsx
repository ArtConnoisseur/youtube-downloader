import './App.css'

import { useRef, useState, useEffect } from 'react';

function VideoDescribe({ title, thumbnail, duration, views }) {
  const hours = Math.floor(duration/3600)

  duration %= 3600 

  const minutes = Math.floor(duration/60)

  duration %= 60 

  const seconds = duration 

  return (
    <div className='video-description'>
      <img src={thumbnail} />
      <div className='video-info'>
        <h2>{title}</h2>
        {views}
      </div>
      <div className='video-length'>
        {`${hours}:${minutes}:${seconds}`}
      </div>
    </div>
  )
}

function App() {
  const inputRef = useRef(null);
  const [ type, setType ] = useState(0)

  const [videos, setVideos] = useState([]);
  
  const types = [
    'Video',
    'Playlist'
  ]

  const handleOnClick = () => {


    const sendDownloadLink = () => {
      const path = `http://localhost:8000/download/${types[type].toLowerCase()}/${inputRef.current.value}`

      fetch(path, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body : {
          name: 'Hello'
        }
      }).then(response => response.json())
        .then(response => setVideos([...videos, response]));
    };

    sendDownloadLink();

    inputRef.current.value = '';
  };

  const handleOptionClick = (selected) => {
    setType(selected);
  };

  return (
    <>
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
        <div className='vid-containers'>
          {videos.map((vid, ind) => <VideoDescribe
        title={vid.title}
        duration={Number(vid.duration)}
        views={vid.views}
        thumbnail={vid.thumbnail}
        key={ind}/>)}
        </div>
      </div>
    </>
  )
}

export default App
