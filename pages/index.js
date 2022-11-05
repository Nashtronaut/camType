import {useState} from 'react'
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import Container from '@mui/material/Container';

import Toolbar from '@mui/material/Toolbar';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Typography from '@mui/material/Typography';
import CameraGridContainer from '../components/keyboard/CameraGridContainer'

const PlaceholderGame = () => {
  return (
    <Box style={{height: 500, border: '1px dotted red'}}>
        Game box
    </Box>
  )
}

export default function Home() {

  const [showGrid, setShowGrid] = useState(true)
  
  const startGame = () => {
    setShowGrid(!showGrid)
  }

  return (
    <div>
      <Head>
        <title>KeyboardCat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static" color="secondary" enableColorOnDark>
        <Toolbar>
          <KeyboardIcon fontSize="large"/>
          <Typography variant="h6" color="black" noWrap>
            Keyboard Typing Trainer
          </Typography>
        </Toolbar>
      </AppBar>
    {/* Component to load after button push here */}
      <main>
      <Container>
          {/* Camera Component */}
        <Box paddingTop="2rem">
            {/* Placeholder box for camera display */}
            {showGrid && <Box>
              <Box style={{height: 500, border: '1px dotted green'}}>
                Grid Box
              </Box>
            </Box>}

            {!showGrid && <PlaceholderGame/>}

            <Box
             display="flex"
             justifyContent="center"
             paddingTop="2rem"
            >
              <Button variant="outlined" color="secondary" onClick={startGame}>
                {showGrid ? "Start Game" : "Oh no take me back"}
              </Button>
            </Box>
        </Box>
      </Container>
      <Container maxWidth="md">
          <Box
            sx={{
              pt: 8,
              pb: 6
            }}
          >
            <Typography variant="h5" align="center"gutterBottom>
              Instructions:
            </Typography>
            <Box 
            display="flex"
            justifyContent="center" 
            bgcolor="grey"
            borderRadius={10}
            >
            <List>
                <ListItem>
                  <ListItemText primary="Ensure your keyboard is in view of your webcam or camera."/>
                </ListItem>
                <Divider/>
                <ListItem>
                  <ListItemText primary="Press <button> to activate your camera."/>
                </ListItem>
                <Divider/>
                <ListItem>
                  <ListItemText primary="Click and drag to line up the onscreen keyboard with your video feed."/>
                </ListItem>
                <Divider/>
                <ListItem>
                  <ListItemText primary="Once aligned, lock in the keyboard shape."/>
                </ListItem>
                <Divider/>
                <ListItem>
                  <ListItemText primary="Your hands will be recognized and a script will appear for you to type."/>
                </ListItem>
                <Divider/>
                <ListItem>
                  <ListItemText primary="Type the script and the machine vision technology will analyze your hand posture and WPM."/>
                </ListItem>
            </List>
          </Box>
          </Box>
        </Container>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
