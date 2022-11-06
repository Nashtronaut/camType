import { useState, useEffect } from 'react'
import Countdown from './Countdown';
import compileQuotes from './api/quoteAPI'
import useKeyPress from './keyboard/useKeyPress';
import keyboard from './keyboard/keyboard.js';

const topRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const midRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
const botRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];


const TypingGame = (props) => {
    const incomingCoords = props.incomingCoords;

    useEffect(() => {
        const quoteSetter = async () => {
            let genQuote = await compileQuotes()
            setGeneratedQuote(genQuote)
            setCurrentChar(genQuote.charAt(0))
            setIncomingChars(genQuote.substr(1))
            return
        }
        quoteSetter()
    }, [])
 
    const [generatedQuote, setGeneratedQuote] = useState('')
    const [outgoingChars, setOutgoingChars] = useState('');
    const [currentChar, setCurrentChar] = useState(generatedQuote.charAt(0));
    const [incomingChars, setIncomingChars] = useState(generatedQuote.substr(1));
    const [leftPadding, setLeftPadding] = useState(
        new Array(20).fill(' ').join('')
      );

    useKeyPress((key) => {

        let updatedOutgoingChars = outgoingChars;
        let updatedIncomingChars = incomingChars;

        if (key === currentChar) {

          if (topRow.includes(key) || midRow.includes(key) || botRow.includes(key)) {
            if (topRow.includes(key.toLowerCase())) {
                let coords = keyboard.rows[0].keys.filter((key) => {
                  if (key.id === currentChar) {
                    return key;
                  }
                })
                console.log(coords);
            }

            if (midRow.includes(key.toLowerCase())) {
              let coords = keyboard.rows[1].keys.filter((key) => {
                if (key.id === currentChar) {
                  return key;
                }
              })
              console.log(coords);
            }

            if (botRow.includes(key.toLowerCase())){
              let coords = keyboard.rows[2].keys.filter((key) => {
                if (key.id === currentChar) {
                  return key;
                }
              })
              console.log(coords);
            }
          }

          if (leftPadding.length > 0) {
            setLeftPadding(leftPadding.substring(1));
          }
          updatedOutgoingChars += currentChar;
          setOutgoingChars(updatedOutgoingChars);
              
          setCurrentChar(incomingChars.charAt(0));
          
          updatedIncomingChars = incomingChars.substring(1);
          if (updatedIncomingChars.split(' ').length < 10) {
            updatedIncomingChars;
          }
          setIncomingChars(updatedIncomingChars);
        }
      });

  return (
    <p style={{ whiteSpace: "pre", color: "black", textAlign: "center", fontFamily: "monospace", fontSize: "2rem" }}>
        <span style={{color: "silver"}}>{(leftPadding + outgoingChars).slice(-20)}</span>
        <span style={{backgroundColor: "#09d3ac"}}>{currentChar}</span>
        <span>{incomingChars.substr(0, 45)}</span>
    </p>
  );
};

export default TypingGame;