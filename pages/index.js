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
import Paper from '@mui/material/Paper';

import Container from '@mui/material/Container';

import Toolbar from '@mui/material/Toolbar';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Typography from '@mui/material/Typography';
import CameraGridContainer from '../components/keyboard/CameraGridContainer'

export default function Home() {

  const [showGrid, setShowGrid] = useState(false)
  
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
          <Typography variant="h5" color="Indigo" noWrap>
            Keyboard Typing Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
      <Container>
        <Box paddingTop="2rem">
          <CameraGridContainer />
        </Box>
      </Container>
      <Container maxWidth="md" sx={{pt:5}}>
          <Paper elevation={3}
            sx={{
              pt: 5,
              pb: 6
            }}
          >
            <Typography variant="h5" color="darkviolet" align="center"gutterBottom >
              Instructions:
            </Typography>
            <Box 
            display="flex"
            justifyContent="center" 
            color= "indigo"
            backgroundColor= "mediumpurple"
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
          </Paper>
        </Container>
      </main>

      <footer>
        <Box display="flex" justifyContent="center" sx={{
              pt: 5,
              pb: 6
            }}>
        <Image src="/favicon.ico" alt="KeyboardCat" width={50} height={50} />
        </Box>
      </footer>
    </div>
  )
}
