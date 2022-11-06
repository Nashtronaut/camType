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
                           {color: '#00FF00', lineWidth: 1});
            drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 1, radius: 2 });
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

const CameraGridContainer = () => {

    const [bottomTab, setBottomTab] = useState(0);
    const [keyHeight, setKeyHeight] = useState(70);
    const [keyWidth, setKeyWidth] = useState(70);
    const [yOffset, setYOffset] = useState(25);
    const [topOffset, setTopOffset] = useState(200);
    const [midOffset, setMidOffset] = useState(225);
    const [botOffset, setBotOffset] = useState(250);

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
                    <canvas className="output_canvas"  style={{ position: 'absolute', background: "purple", height: "100%", width: "100%" }} />
                    <video className="input_video" style={{ display: "none" }} autoPlay playInline /> 
                    <Box className={styles.gridBox}>
                        <KeyboardGrid
                            keyHeight={keyHeight}
                            keyWidth={keyWidth}
                            yOffset={yOffset}
                            topOffset={topOffset}
                            midOffset={midOffset}
                            botOffset={botOffset} />
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
                />
            }

            {bottomTab === 1 && 
                <TypingGame/>
            }
        </Box>
    );
}

export default CameraGridContainer;