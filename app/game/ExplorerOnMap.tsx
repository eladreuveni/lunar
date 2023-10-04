'use client';
import React from 'react'
import { useGameContext } from './GameContext';
import { Explorer } from '../../libs/types/gameTypes';

interface Props {
    exp: Explorer
}

const ExplorerOnMap = ({ exp }: Props) => {
    const { currentExplorer } = useGameContext();
    return (
        <img
            className={`${currentExplorer === exp && "animate-shake"} cursor-pointer justify-center w-full h-full`}
            src={`/game_assets/${exp}.svg`}
            alt={exp}
        />
    )
}

export default ExplorerOnMap