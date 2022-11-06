import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import KeyboardGrid from './KeyboardGrid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { Slider } from '@mui/material';

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
                    <canvas style={{ position: 'absolute', background: "purple", height: "100%", width: "100%" }} />
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
                        <Slider value={ keyWidth } onChange={ handleKeyWidth }  min={50} max={500} disabled={lockVals} />
                    </Box>
                    
                    <Box style={{border: "1px solid blue", borderRadius: "2rem", padding: "0.8rem, 2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Key Height</InputLabel>
                        <Slider value={ keyHeight } onChange={ handleKeyHeight } min={50} max={500} disabled={lockVals} />
                    </Box>
                    
                    <Box style={{border: "1px solid blue", borderRadius: "2rem", padding: "0.8rem, 2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Slide keyboard Up/Down</InputLabel>
                        <Slider value={ yOffset } onChange={ handleYOffset } max={1000} disabled={lockVals} />
                    </Box>
                </Grid>

                <Grid style={{display: "flex", justifyContent: "center", alignItems: "center" }} xs={3}>
                    {lockVals && 
                        <LockIcon onClick={() => setLockVals(!lockVals)} />
                        }
                    {!lockVals && 
                        <LockOpenIcon onClick={() => setLockVals(!lockVals)} />
                        }
                </Grid>

                <Grid xs={4} item style={{display: "flex", flexDirection: "column", gap: 15}}>
                    <Box style={{border: "1px solid blue", borderRadius: "2rem", padding: "0.8rem, 2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Top Row Offset</InputLabel>
                        <Slider value={ topOffset } onChange={ handleTopOffset } max={1000} disabled={ lockVals }/>
                    </Box>
                    
                    <Box style={{border: "1px solid blue", borderRadius: "2rem", padding: "0.8rem, 2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Mid Row Offset</InputLabel>
                        <Slider value={ midOffset } onChange={ handleMidOffset } max={1000} disabled={ lockVals }/>
                    </Box>
                    
                    <Box style={{border: "1px solid blue", borderRadius: "2rem", padding: "0.8rem, 2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Bot Row Offset</InputLabel>
                        <Slider value={ botOffset } onChange={ handleBotOffset } max={1000} disabled={ lockVals }/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        
    );
}

export default CameraGridContainer;