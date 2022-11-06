import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { color } from '@mui/system';


const Sliders = (props) => {

    let keyHeight = props.keyHeight;
    let keyWidth = props.keyWidth;
    let yOffset = props.yOffset;
    let topOffset = props.topOffset;
    let midOffset = props.midOffset;
    let botOffset = props.botOffset;
    const handleKeyWidth = props.handleKeyWidth;
    const handleKeyHeight = props.handleKeyHeight;
    const handleYOffset = props.handleYOffset;
    const handleTopOffset = props.handleTopOffset;
    const handleMidOffset = props.handleMidOffset;
    const handleBotOffset = props.handleBotOffset;
    const setUp = props.setUp;

    const [lockVals, setLockVals] = useState(false);


    return(
        <Grid container style={{ justifyContent: 'center' }}>
                <Grid item xs={4} style={{display: "flex", flexDirection: "column", gap: 15}}>
                    <Box style={{border: "1px solid rgba(42,27,61,255)", backgroundColor: "rgba(135,101,214,255)", borderRadius: "2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Key Width</InputLabel>
                        <Slider value={ keyWidth } onChange={ handleKeyWidth }  min={35} max={115} disabled={lockVals} />
                    </Box>
                    
                    <Box style={{border: "1px solid rgba(42,27,61,255)", backgroundColor: "rgba(135,101,214,255)", borderRadius: "2rem", padding: "0.8rem, 2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Key Height</InputLabel>
                        <Slider value={ keyHeight } onChange={ handleKeyHeight } min={50} max={160} disabled={lockVals} />
                    </Box>
                    
                    <Box style={{border: "1px solid rgba(42,27,61,255)", backgroundColor: "rgba(135,101,214,255)", borderRadius: "2rem", padding: "0.8rem, 2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Slide keyboard Up/Down</InputLabel>
                        <Slider value={ yOffset } onChange={ handleYOffset } max={400} disabled={lockVals} />
                    </Box>
                </Grid>

                <Grid item style={{display: "flex", gap: "1rem", flexDirection: "column", justifyContent: "center", alignItems: "center" }} xs={3}>
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
                        <Button variant="contained" onClick={setUp} disabled={!lockVals}>Start Typing Test</Button>
                </Grid>

                <Grid xs={4} item style={{display: "flex", flexDirection: "column", gap: 15}}>
                    <Box style={{border: "1px solid rgba(42,27,61,255)", backgroundColor: "rgba(135,101,214,255)", borderRadius: "2rem", padding: "0.8rem, 2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Top Row Offset</InputLabel>
                        <Slider value={ topOffset } onChange={ handleTopOffset } max={800} disabled={ lockVals }/>
                    </Box>
                    
                    <Box style={{border: "1px solid rgba(42,27,61,255)", backgroundColor: "rgba(135,101,214,255)", borderRadius: "2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Mid Row Offset</InputLabel>
                        <Slider value={ midOffset } onChange={ handleMidOffset } max={800} disabled={ lockVals }/>
                    </Box>
                    
                    <Box style={{border: "1px solid rgba(42,27,61,255)", backgroundColor: "rgba(135,101,214,255)", borderRadius: "2rem", padding: "0.2rem 2rem"}}>
                        <InputLabel>Bot Row Offset</InputLabel>
                        <Slider value={ botOffset } onChange={ handleBotOffset } max={800} disabled={ lockVals }/>
                    </Box>
                </Grid>
            </Grid>
    );
}

export default Sliders;