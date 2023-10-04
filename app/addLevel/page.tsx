import React from 'react'
import GameMap from '../game/GameMap'
import { GameProvider } from '../game/GameContext'
import AllExplorers from './AllExplorers'
import GameButtons from '../game/GameButtons';
import AddButton from './AddButton';

const AddLevelPage = () => {
    return <GameProvider addLevelMode={true}>
        <div className='m-5'>
            <label htmlFor="level" className='border-black border-2 p-1 text-xl text-center'>Level:
                <input type="number" id="level" name="level" min="1" max="40" className='text-center w-10' />
            </label>
        </div>
        <GameButtons />
        <div className='flex flex-col pc:flex-row items-center justify-center'>
            <GameMap />
            <AllExplorers />
        </div>
        <AddButton />
    </GameProvider>
};

export default AddLevelPage