import '../styles/globals.css'
import {ThemeProvider} from "@mui/material"
import {theme} from "../utils/theme/config"

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
