import { useState } from 'react'
import styles from '../../styles/KeyBoardGrid.module.css'
import Box from "@mui/material/Box";
import keyboard from './keyboard.js';

const KeyboardGrid = () => {

    const [keyHeight, setKeyHeight] = useState(100);
    const [keyWidth, setKeyWidth] = useState(100);

    keyboard.keyHeight = keyHeight;
    keyboard.keyWidth = keyWidth;
    const offsets = [30, 50, 70];

    keyboard.rows[0].offset = offsets[0];
    keyboard.rows[1].offset = offsets[1];
    keyboard.rows[2].offset = offsets[2];

    return (
        <div>
            {keyboard.rows.map((row) => {
                return(
                    <Box className={styles.row} key={row.id}>

                        <Box className={styles.offset} style={{ width: `${row.offset}px`, height: `${keyboard.keyHeight}px` }}  /> {/* offset Div */}

                        {row.keys.map((key) => {
                            return (
                            <Box className={styles.key} style={{ width: `${keyboard.keyWidth}px`, height: `${keyboard.keyHeight}px` }} key={key.key}>{key.key}</Box>
                            );
                        })}

                    </Box>
                );
            })}
        </div>
    );
};

export default KeyboardGrid;