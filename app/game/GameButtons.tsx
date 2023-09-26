import React from 'react'
import SingleGameButton from './SingleGameButton'

const GameButtons = () => {
    return (
        <div className='flex justify-around my-5'>
            <SingleGameButton text='reset'
                icon={{ path: 'reset' }} />
            <SingleGameButton text='undo'
                icon={{ path: 'undo' }} />
        </div>
    )
}

export default GameButtons