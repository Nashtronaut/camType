import { useState } from 'react';
import styles from '../../styles/CameraGridContainer.module.css';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import '@mediapipe/control_utils';
import { Camera } from '@mediapipe/camera_utils'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import KeyboardGrid from './KeyboardGrid';
import Sliders from '../Sliders';
import TypingGame from '../TypingGame';

const CameraGridContainer = (props) => {

    const setUpCoords = (incomingCoords) => {
        if (incomingCoords){
            const fingerPositions = [
                {
                    key: "lPink",
                    x: incomingCoords[0][20].x,
                    y: incomingCoords[0][20].y
                },
                {
                    key: "lRing",
                    x: incomingCoords[0][16].x,
                    y: incomingCoords[0][16].y
                },
                {
                    key: "lMid",
                    x: incomingCoords[0][12].x,
                    y: incomingCoords[0][12].y
                },
                {
                    key: "lIndex",
                    x: incomingCoords[0][8].x,
                    y: incomingCoords[0][8].y
                },
                {
                    key: "rIndex",
                    x: incomingCoords[1][8].x,
                    y: incomingCoords[1][8].y
                },
                {
                    key: "rMid",
                    x: incomingCoords[1][12].x,
                    y: incomingCoords[1][12].y
                },
                {
                    key: "rRing",
                    x: incomingCoords[1][16].x,
                    y: incomingCoords[1][16].y
                },
                {
                    key: "rPink",
                    x: incomingCoords[1][20].x,
                    y: incomingCoords[1][20].y
                }
            ]
            return fingerPositions;
        }
    };

    const setUp = () => {
        const videoElement = document.getElementsByClassName('input_video')[0];
        const canvasElement = document.getElementsByClassName('output_canvas')[0];
        const canvasCtx = canvasElement.getContext('2d');
    
        function onResults(results) {
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(
                results.image, 0, 0, canvasElement.width, canvasElement.height);
            if (results.multiHandLandmarks) {
              for (const landmarks of results.multiHandLandmarks) {
                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                               {color: '#48318b', lineWidth: 1});
                drawLandmarks(canvasCtx, landmarks, {color: '"#93e8be', lineWidth: 1, radius: 1.2 });
              }
    
              if (results.multiHandLandmarks.length > 1) {
                    setIncomingCoords(setUpCoords(results.multiHandLandmarks)); 
              }
            }
    
            canvasCtx.restore();
          }
          
          const hands = new Hands({locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          }});
          hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
            selfieMode: false, // Flips camera to correct orientation
          });
          hands.onResults(onResults);
          
          const camera = new Camera(videoElement, {
            onFrame: async () => {
              await hands.send({image: videoElement});
            },
            width: 1280,
            height: 720
          });
          camera.start();
    };
    
    const [incomingCoords, setIncomingCoords] = useState();
    const [bottomTab, setBottomTab] = useState(0);
    const [keyHeight, setKeyHeight] = useState(70);
    const [keyWidth, setKeyWidth] = useState(70);
    const [yOffset, setYOffset] = useState(220);
    const [topOffset, setTopOffset] = useState(200);
    const [midOffset, setMidOffset] = useState(225);
    const [botOffset, setBotOffset] = useState(250);
    const screenHeight = 560;
    const screenWidth = 1000;
    const setShowBoard = props.setShowBoard;

    const handleKeyWidth = (e, newValue) => {
        setKeyWidth(newValue);
    };

    const handleKeyHeight = (e, newValue) => {
        setKeyHeight(newValue);
    };

    const handleYOffset = (e, newValue) => {
        setYOffset(newValue);
    };

    const handleTopOffset = (e, newValue) => {
        setTopOffset(newValue);
    };

    const handleMidOffset = (e, newValue) => {
        setMidOffset(newValue);
    };

    const handleBotOffset = (e, newValue) => {
        setBotOffset(newValue);
    };


    const handleBottomTab = (e, newValue) => {
        setBottomTab(newValue);
    };

    return(
        <Box>
            <Grid container style={{ position: 'relative', marginBottom: "1rem" }}>
                <Grid xs={12} item style={{ display: "flex" }}>
                    <canvas className="output_canvas"  style={{border: '10px solid rgba(135,101,214,255)', borderRadius: '1rem' , position: 'absolute', background: "#8ee2b8", height: "100%", width: "100%"}} />
                    <video className="input_video" style={{ display: "none" }} autoPlay playInline /> 
                    <Box style={{ position: 'relative', display: "flex", zIndex: 1, alignItems: 'end', minWidth: `${screenWidth}px`, minHeight: `${screenHeight}px`, maxHeight: `${screenHeight}px`, overflow: 'hidden' }}>
                        <KeyboardGrid
                            keyHeight={keyHeight}
                            keyWidth={keyWidth}
                            yOffset={yOffset}
                            topOffset={topOffset}
                            midOffset={midOffset}
                            botOffset={botOffset} 
                            screenHeight={screenHeight}
                            screenWidth={screenWidth}/>
                    </Box>
                </Grid>
            </Grid>


            {bottomTab === 0 && 
                <Sliders 
                keyHeight={keyHeight}
                keyWidth={keyWidth}
                yOffset={yOffset}
                topOffset={topOffset}
                midOffset={midOffset}
                botOffset={botOffset}
                handleKeyWidth={handleKeyWidth}
                handleKeyHeight={handleKeyHeight}
                handleYOffset={handleYOffset}
                handleTopOffset={handleTopOffset}
                handleMidOffset={handleMidOffset}
                handleBotOffset={handleBotOffset}
                setUp={setUp}
                setBottomTab={setBottomTab}
                setShowBoard={setShowBoard}
                />
            }

            {bottomTab === 1 &&
                <TypingGame incomingCoords={incomingCoords} />
            }
        </Box>
    );
}

export default CameraGridContainer;