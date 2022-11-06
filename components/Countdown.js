import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Countdown = () => {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <Typography variant="h5" color="black" align="center">
      Countdown: {counter}
    </Typography>     
  );
}

export default Countdown;