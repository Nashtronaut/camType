import { useState, useEffect } from 'react'
import Countdown from './Countdown';
import compileQuotes from './api/quoteAPI'
import useKeyPress from './keyboard/useKeyPress';


const TypingGame = () => {

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