import { useState, useEffect } from "react";

import Box from '@mui/material/Box';

const GetReady = () => {
  const [counter, setCounter] = useState(3);

useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
      <Box>Countdown: {counter}</Box>
  );
}

export default GetReadyCountdown;