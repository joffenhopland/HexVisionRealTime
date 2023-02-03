import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
// @ts-ignore
import { VideoStreamer } from '@flytnow/video-client'
import Rectangle from './components/Rectangle';

import { DrawableObject, feedHeight, feedWidth } from './components/types';
import Rectangles from './components/Rectangles';

function App() {

  const api_key = 'NjEzZDA4MjI0YjIzYmM0NGJkNjU5ZDlhNzZkZDEzODk4MmYzNzE3OGFiZjc4OWZhMThhYzE5MjQ=';
  const vehicle_id = 'r4EeYcnz';
  const source_id = 0;
  const element_id = 'maverick-feed';
  const [videoFeedObj, setVideoFeedObj] = useState<VideoStreamer>();

  const [objectText, setObjectText] = useState('Objects:')
  const [detecting, setDetecting] = useState(false);

  const [imageInterval, setImageInterval] = useState<NodeJS.Timer>();
  const [feedInitialized, setFeedInitialized] = useState(false);

  const [rectangles, setRectangles] = useState(<></>)

  const delay = (ms: number | undefined) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  useEffect(() => {
    const initFeed = async (api_key: any, vehicle_id: any, source_id: any, element_id: any) => {
    // Instantiating VideoStreamer Object
    // which will expose all the API methods once connection is established
    console.log(initFeed)
    let videoFeed = await new VideoStreamer(
      api_key,
      vehicle_id,
      source_id,
      element_id
    );
    console.log(videoFeed)


    if (videoFeed == null) {
      return;
    }

    setVideoFeedObj(videoFeed);

    // Checking for connection failure
    if (videoFeed['status'] === false) {
      console.log(
        'Something went wrong.',
        videoFeed['code'],
        videoFeed['message']
      );
    } else {
      //Connection Successful
      console.log(
        'Feed Active for ',
        vehicle_id,
        ' with source-id ',
        source_id
      );
      
      await delay(5000);
      const imageIntervalVal = setInterval(() => {
        detectObjects(videoFeed);
      }, 5000);
      setImageInterval(imageIntervalVal);
      setDetecting(true);
    }
  }

  if (!feedInitialized) {
        console.log('initializing');
        initFeed(api_key, vehicle_id, source_id, element_id);
        setFeedInitialized(true);
    }

    return () => clearInterval(imageInterval);
  }, []);

  const stopDetection = () => {
      clearInterval(imageInterval);
      setDetecting(false);
  }

  const startDetection = () => {
    console.log('beginning')
    const imageIntervalVal = setInterval(() => {
      detectObjects(videoFeedObj);
    }, 5000);
    setImageInterval(imageIntervalVal);
    setDetecting(true);
  }

  const detectObjects = (droneVideoFeed: any) => {
    const handleFetch = (json: any) => {
        console.log('json-ray', json);
        if (json.status === 'success') {
          console.log(json)
          setRectangles(<><Rectangles rectangles={json.objects} /></>)
        }
    }

    console.log('detecting');

    if (droneVideoFeed != null) {
        const imageData = droneVideoFeed.getImageData();
        console.log('got data');
        const form_data = {'image_string': imageData};
        const headers = new Headers();
        headers.append('Authorization', `Token test`);
        headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5000/party');
        headers.append('Access-Control-Allow-Credentials', 'true'); 
        headers.append('Content-Type', 'application/json');
    
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(form_data)
        };
        fetch(`http://127.0.0.1:5000/party`, requestOptions)
        .then((response) => response.json())
        .then((json) => {handleFetch(json)})
    }
    else {
      console.log('null!');
    }
  }

  return (
    <>
      {detecting && <Button onClick={stopDetection}>Click To Stop Object Detection</Button>}
      {!detecting && <Button onClick={startDetection}>Click To Start Object Detection</Button>}
      <h3>{objectText}</h3>
      <div className="App">
        <div className="feed-container" style={{"width": `${feedWidth}px`, "height": `${feedHeight}px`}}>
          {rectangles}
          <div id="maverick-feed"></div>
        </div>
      </div>
    </>
  );
}

export default App;
