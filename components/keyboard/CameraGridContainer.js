import { useState } from 'react';

import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import '@mediapipe/control_utils';
import { Camera } from '@mediapipe/camera_utils'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
 
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import KeyboardGrid from './KeyboardGrid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { Slider } from '@mui/material';

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
                           {color: '#00FF00', lineWidth: 5});
            drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
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

    const [keyHeight, setKeyHeight] = useState(70);
    const [keyWidth, setKeyWidth] = useState(70);
    const [yOffset, setYOffset] = useState(300);
    const [topOffset, setTopOffset] = useState(200);
    const [midOffset, setMidOffset] = useState(225);
    const [botOffset, setBotOffset] = useState(250);
    const [lockVals, setLockVals] = useState(false);

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

    return(
        <Box>
            <Grid container style={{ position: 'relative', marginBottom: "1rem" }}>
                <Grid xs={12} item style={{ display: "flex" }}>
                    <canvas className="output_canvas" style={{ position: 'absolute', background: "purple", height: "100%", width: "100%" }} />
                    <video className="input_video" style={{ display: "none" }} autoPlay playInline /> 
                    <Box style={{ position: 'relative', width: "100%", height: "100%", display: "flex", zIndex: 1, alignItems: 'end', minHeight: "35rem", border: "1px solid hotpink", overflow: 'hidden' }}>
                        <KeyboardGrid
                            keyHeight={keyHeight} 
                            keyWidth={keyWidth}
                            yOffset={yOffset}
                            topOffset={topOffset}
                            midOffset={midOffset}
                            botOffset={botOffset}/>
                    </Box>
                </Grid>
            </Grid>
            <Grid container style={{ justifyContent: 'center' }}>
                <Grid item xs={4} style={{display: "flex", flexDirection: "column", gap: 15}}>
                    <Box style={{border: "1px solid blue", borderRadius: "2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Key Width</InputLabel>
                        <Slider value={ keyWidth } onChange={ handleKeyWidth }  min={35} max={115} disabled={lockVals} />
                    </Box>
                    
                    <Box style={{border: "1px solid blue", borderRadius: "2rem", padding: "0.8rem, 2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Key Height</InputLabel>
                        <Slider value={ keyHeight } onChange={ handleKeyHeight } min={50} max={160} disabled={lockVals} />
                    </Box>
                    
                    <Box style={{border: "1px solid blue", borderRadius: "2rem", padding: "0.8rem, 2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Slide keyboard Up/Down</InputLabel>
                        <Slider value={ yOffset } onChange={ handleYOffset } max={400} disabled={lockVals} />
                    </Box>
                </Grid>

                <Grid style={{display: "flex", gap: "1rem", flexDirection: "column", justifyContent: "center", alignItems: "center" }} xs={3}>
                    {lockVals && 
                    <Button variant="contained" onClick={() => setLockVals(!lockVals)}>
                        <LockIcon />
                    </Button>
                        }
                    {!lockVals &&
                        <Button variant="contained" onClick={() => setLockVals(!lockVals)}>
                            <LockOpenIcon />
                        </Button> 
                        }
                        <Button variant="contained" onClick={() => setUp()} disabled={!lockVals}>Start Typing Test</Button>
                </Grid>

                <Grid xs={4} item style={{display: "flex", flexDirection: "column", gap: 15}}>
                    <Box style={{border: "1px solid blue", borderRadius: "2rem", padding: "0.8rem, 2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Top Row Offset</InputLabel>
                        <Slider value={ topOffset } onChange={ handleTopOffset } max={800} disabled={ lockVals }/>
                    </Box>
                    
                    <Box style={{border: "1px solid blue", borderRadius: "2rem", padding: "0.8rem, 2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Mid Row Offset</InputLabel>
                        <Slider value={ midOffset } onChange={ handleMidOffset } max={800} disabled={ lockVals }/>
                    </Box>
                    
                    <Box style={{border: "1px solid blue", borderRadius: "2rem", padding: "0.8rem, 2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Bot Row Offset</InputLabel>
                        <Slider value={ botOffset } onChange={ handleBotOffset } max={800} disabled={ lockVals }/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        
    );
}

export default CameraGridContainer;