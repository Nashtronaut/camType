import { useState, useEffect } from 'react'
import compileQuotes from './api/quoteAPI'
import useKeyPress from './keyboard/useKeyPress';
import { currentTime } from './api/getTime';
import { Box } from '@mui/system';
import keyboard from './keyboard/keyboard.js';

const topRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const midRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
const botRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];


const TypingGame = (props) => {
    const incomingCoords = props.incomingCoords;
    const [endGame, setEndGame] = useState(false)
    useEffect(() => {
        const quoteSetter = async () => {
            let genQuote = await compileQuotes()
            setGeneratedQuote(genQuote)
            setCurrentChar(genQuote.charAt(0))
            setIncomingChars(genQuote.substr(1))
            return
        }
        quoteSetter()
    }, [endGame]);
    
    const [generatedQuote, setGeneratedQuote] = useState('')
    const [outgoingChars, setOutgoingChars] = useState('');
    const [currentChar, setCurrentChar] = useState(generatedQuote.charAt(0));
    const [incomingChars, setIncomingChars] = useState(generatedQuote.substr(1));
    const [leftPadding, setLeftPadding] = useState(
        new Array(32).fill(' ').join('')
      );
    const [startTime, setStartTime] = useState();
    const [wordCount, setWordCount] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [countDown, setCountDown] = useState(60);
    const [startGame, setStartGame] = useState(false)
    const [startHelp, setStartHelp] = useState("")
    const [currentScore, setCurrentScore] = useState(0)
    const [highScore, setHighScore] = useState(0)

    useKeyPress(key => {
        if(endGame){
            setCountDown(60)
            setEndGame(false)
            setWpm(0)
            if(currentScore > highScore){
                setHighScore(currentScore)
            }
            setCurrentScore(0)
        }
        if (key === "`"){
            setStartGame(true)
            let interval = setInterval(() => {
                setCountDown((prevCountdown) => {
                  if (prevCountdown === 0) {
                    clearInterval(interval)
                    setStartGame(false)
                    setGeneratedQuote("")
                    setCurrentChar("")
                    setIncomingChars("")
                    setOutgoingChars("")
                    setStartHelp("Great Work!")
                    setCountDown(0)
                    setEndGame(true)
                  } else {
                    return prevCountdown - 1
                  }
                }  )
              } ,  1000 )
        }
        
        let updatedOutgoingChars = outgoingChars;
        let updatedIncomingChars = incomingChars;
        if (key !== "`" && !startGame){
            setStartHelp("Press ` to begin the game")
        }
        else{
            if (!startTime) {
                setStartTime(currentTime());
              }
            if(key !== currentChar){
                setCurrentScore(currentScore -10)
                
            }
            
            if (key === currentChar) {
                setCurrentScore(currentScore+15)
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
              if (incomingChars.charAt(0) === ' ') {
                setWordCount(wordCount + 1);
                const durationInMinutes = (currentTime() - startTime) / 60000.0;
                setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
                
              }
            }
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
        }
      });

  return (
    <Box>
        <p style={{ whiteSpace: "pre", color: "black", padding: "0.7rem", borderRadius: '1.8rem', background: "white", textAlign: "center", fontFamily: "monospace", fontSize: "2rem" }}>
            <span style={{color: "silver"}}>{(leftPadding + outgoingChars).slice(-32)}</span>
            <span style={{backgroundColor: "#09d3ac"}}>{currentChar}</span>
            <span>{incomingChars.substr(0, 25)}</span>
        </p>
        <h3 style={{textAlign: "center", color: "black", fontFamily: "monospace", fontSize: "1.5rem", padding: '0.8rem', borderRadius: "1.8rem", background: "#09d3ac"}}>WPM: {wpm} | Time Left: {countDown} | Score: {currentScore} | High Score: {highScore}</h3>
        {!startGame && <h4 style={{textAlign: "center", color: "white",fontFamily: "monospace", fontSize: "1.2rem"}}> {startHelp}</h4>}
    </Box>
  );
};

export default TypingGame;