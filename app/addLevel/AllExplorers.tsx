'use client';
import React from 'react'
import { useGameContext } from '../game/GameContext';
import { Explorer } from '@/libs/types/gameTypes';

const AllExplorers = () => {
    const { currentExplorer, selectExplorer, addLevelInfo } = useGameContext();
    const { explorersAvailable } = addLevelInfo;
    const exp = (e: Explorer) => (<img
        key={e}
        className={`${currentExplorer === e && "animate-shake"} cursor-pointer justify-center`}
        src={`/game_assets/${e}.svg`}
        alt={e}
        onClick={() => selectExplorer(e)}
    />)

    return (
        <div className='flex flex-col'>
            <div className='flex m-5 justify-center'>
                {explorersAvailable?.slice(0, Math.ceil(explorersAvailable.length / 2)).map(e => exp(e))}
            </div>
            <div className='flex m-5 justify-center'>
                {explorersAvailable?.slice(Math.ceil(explorersAvailable.length / 2)).map(e => exp(e))}
            </div>
        </div>
    )
}

export default AllExplorers