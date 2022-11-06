import { useState } from 'react'
import styles from '../../styles/KeyBoardGrid.module.css'
import Box from "@mui/material/Box";
import keyboard from './keyboard.js';


const KeyboardGrid = (props) => {
    
    keyboard.keyHeight = props.keyHeight;
    keyboard.keyWidth = props.keyWidth;
    keyboard.yOffset = props.yOffset;
    keyboard.rows[0].offset = props.topOffset;
    keyboard.rows[1].offset = props.midOffset;
    keyboard.rows[2].offset = props.botOffset;
    const screenWidth = props.screenWidth;
    const screenHeight = props.screenHeight;

    return (
        <div styles={{ color: "white" }}>
            {keyboard.rows.map((row) => {
                return(
                    <Box className={styles.row} key={row.id}>

                        <Box className={styles.offset} style={{ width: `${row.offset}px`, height: `${keyboard.keyHeight}px` }}  /> {/* offset Div */}

                        {row.keys.map((key, index) => {
                            let rowNum = 2;
                            let bottomSide = keyboard.yOffset + rowNum * keyboard.keyHeight;
                            let leftSide = row.offset + index * keyboard.keyWidth;

                            row.keys[index].xCors[0] = leftSide / screenWidth;
                            row.keys[index].xCors[1] = (leftSide + keyboard.keyWidth) / screenWidth;
                            row.keys[index].yCors[0] = bottomSide / screenHeight;
                            row.keys[index].yCors[1] = (bottomSide + keyboard.keyHeight) / screenHeight;
                            rowNum--;
                            
                            return (
                            <Box key={key.id} className={styles.key} style={{ width: `${keyboard.keyWidth}px`, height: `${keyboard.keyHeight}px` }}>{key.id.toUpperCase()}</Box>
                            );
                        })}
                    </Box>
                );
            })}
            <Box className={styles.yOffset} style={{ width: "100%", height: `${keyboard.yOffset}px` }}/>
        </div>
    );
};

export default KeyboardGrid;