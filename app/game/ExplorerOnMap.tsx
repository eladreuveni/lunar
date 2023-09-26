'use client';
import React from 'react'
import { useGameContext } from './GameContext';
import { Explorer } from '../types/gameTypes';

interface Props {
    exp: Explorer
}

const ExplorerOnMap = ({ exp }: Props) => {
    const { currentExplorer, selectExplorer } = useGameContext();
    const selectFunc = () => {
        selectExplorer(exp !== currentExplorer ? exp : '')
    }
    return (
        <img
            className="cursor-pointer justify-center w-full h-full"
            src={`/game_assets/${exp}.svg`}
            alt={exp}
        />
    )
}

export default ExplorerOnMap