import {createTheme} from '@mui/material'

const themeOptions = {
    palette: {
      primary: {
        light: '#ab47bc',
        main: '#9c27b0',
        dark: '#8e24aa',
        contrastText: '#fff',
      },
      secondary: {
        light: '#bdbdbd',
        main: '#9e9e9e',
        dark: '#757575',
        contrastText: '#000',
      },
      project: {
        darkPurple: "#2a1b3d",
        mediumPurple: "#48318b",
        lightPurple: "#8765d6",
        lilac:"#bda7eb",
        sageGreen:"#59be89",
        seafoam:"#93e8be",
        error:"#c33745"
      },
    },
  };

const theme = createTheme(themeOptions)
export {theme}