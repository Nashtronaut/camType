import { useState, useEffect } from "react";

import Box from '@mui/material/Box';

const Countdown = () => {
  const [counter, setCounter] = useState(60);

useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
      <Box>Countdown: {counter}</Box>
  );
}

export default Countdown;