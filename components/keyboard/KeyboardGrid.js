import styles from '../../styles/keyboardGrid.module.css';
import { Box } from "@mui/material/Box";
import keyboard from './keyboard.js';

const KeyboardGrid = () => {
    return (
        <div>
            {keyboard.map((row) => {
                <Box className="row" key={row.key}>
                    <Box width={row.offset} height={row.keyHeight} /> {/* offset Div */}

                    {row.map((key) => {
                        <Box className="key" key={key.key} width={row.keyWidth} height={row.keyHeight}>{key.key.ToUpperCase()}</Box>
                    })}

                </Box>
            })}
        </div>
    );
};

export default keyboardGrid;