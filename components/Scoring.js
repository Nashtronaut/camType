import { SettingsCellRounded } from '@mui/icons-material'
import { useEffect, useState } from 'react'

export default function ScoreKeeper() {
    const [score, setScore] = useState(parseInt(localStorage.getItem('score'))  || 0)

    useEffect (() => {
        localStorage.setItem('score', score)
    }, [score])

    return(
        <div>
            <h1>Your score is: {score}</h1>

           /* Something about the corrent key press */

            onKeydown={() => setScore(prevScore => prevScore+1) }
        </div>
    )
}