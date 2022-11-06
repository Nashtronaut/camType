import { useState } from 'react'

import Countdown from './Countdown';
import compileQuotes from './api/quoteAPI'
import useKeyPress from '../utils/hooks/useKeyPress';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

let generatedQuote = "lorem ipsum dolor sit amet lorem ipsum dolor lorem ipsum dolor"

const TypingGame = () => {

    console.log(generatedQuote)
    const [leftPadding, setLeftPadding] = useState(
        new Array(20).fill(' ').join(''),
      );
    const [outgoingChars, setOutgoingChars] = useState('');
    const [currentChar, setCurrentChar] = useState(generatedQuote.charAt(0));
    const [incomingChars, setIncomingChars] = useState(generatedQuote.substr(1));

    useKeyPress(key => {

        let updatedOutgoingChars = outgoingChars;
        let updatedIncomingChars = incomingChars;
        
        if (key === currentChar) {
          if (leftPadding.length > 0) {
            setLeftPadding(leftPadding.substring(1));
          }
          updatedOutgoingChars += currentChar;
          setOutgoingChars(updatedOutgoingChars);
              
          setCurrentChar(incomingChars.charAt(0));
          
          updatedIncomingChars = incomingChars.substring(1);
          if (updatedIncomingChars.split(' ').length < 10) {
            updatedIncomingChars +=' ' + compileQuotes();
          }
          setIncomingChars(updatedIncomingChars);
        }
      });

  return (
    <p style={{ whiteSpace: "pre", color: "black", textAlign: "center", fontFamily: "monospace", fontSize: "2rem" }}>
        <span style={{color: "silver"}}>{(leftPadding + outgoingChars).slice(-20)}</span>
        <span style={{backgroundColor: "#09d3ac"}}>{currentChar}</span>
        <span>{incomingChars.substr(0, 20)}</span>
    </p>
  );
};
export default TypingGame;