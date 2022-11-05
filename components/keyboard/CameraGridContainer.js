import { useState } from 'react';
import Box from '@mui/material/Box';
import KeyboardGrid from './KeyboardGrid';

const CameraGridContainer = () => {

    const [keyHeight, setKeyHeight] = useState(100);
    const [keyWidth, setKeyWidth] = useState(100);
    const [yOffset, setYOffset] = useState(100);
    const [topOffset, setTopOffset] = useState(30);
    const [midOffset, setMidOffset] = useState(50);
    const [botOffset, setBotOffset] = useState(80);

    return(
        <Box>
            <KeyboardGrid
                keyHeight={keyHeight} 
                keyWidth={keyWidth}
                yOffset={yOffset}
                topOffset={topOffset}
                midOffset={midOffset}
                botOffset={botOffset}/>
        </Box>
    );
}

export default CameraGridContainer;