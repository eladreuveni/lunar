'use client';
import React from 'react'
import SingleGameButton from './SingleGameButton'
import { useGameContext } from './GameContext'

const GameButtons = () => {
    const { resetMap, undoLastMove, toggleSetUpCompleted, addLevelMode, addLevelInfo } = useGameContext();

    return (
        <div className='flex justify-around my-5'>
            <SingleGameButton
                action={resetMap}
                icon={{ path: 'reset' }} />
            {addLevelMode && <SingleGameButton
                action={toggleSetUpCompleted}
                text={`${addLevelInfo.setUpCompleted ? 'un' : ''}complete setUp`}
            />}
            <SingleGameButton
                action={undoLastMove} // todo disable if no moves
                icon={{ path: 'undo' }} />
        </div>
    )
}

export default GameButtons