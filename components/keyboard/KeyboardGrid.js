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

    return (
        <div styles={{ color: "white" }}>
            {keyboard.rows.map((row) => {
                return(
                    <Box className={styles.row} key={row.id}>

                        <Box className={styles.offset} style={{ width: `${row.offset}px`, height: `${keyboard.keyHeight}px` }}  /> {/* offset Div */}

                        {row.keys.map((key, index) => {

                            let leftSide = row.offset + index * keyboard.keyWidth; 
                            row.keys[index].corsx[0] = leftSide;
                            row.keys[index].corsx[1] = leftSide + keyboard.keyWidth;

                            let rowNum = 2;
                            let bottomSide = keyboard.yOffset + rowNum * keyboard.keyHeight;
                            
                            row.keys[index].corsy[0] = bottomSide;
                            row.keys[index].corsy[1] = bottomSide + keyboard.keyHeight;
                            rowNum--;
                            
                            return (
                            <Box key={key.id} className={styles.key} style={{ width: `${keyboard.keyWidth}px`, height: `${keyboard.keyHeight}px` }}>{key.id.toUpperCase()}</Box>
                            );
                        })}
                    </Box>
                );
            })}
            <Box className={styles.yOffset} style={{ width: "100%", height: `${keyboard.yOffset}px` }}/>
            {console.log(keyboard.rows[0].keys[0].corsx)}
            {console.log(keyboard.rows[0].keys[0].corsy)}
        </div>
    );
};

export default KeyboardGrid;