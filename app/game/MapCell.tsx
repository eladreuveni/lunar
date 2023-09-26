'use client';
import React from 'react'
import ExplorerOnMap from './ExplorerOnMap'
import { useGameContext } from './GameContext'
import { GridCell } from '../types/gameTypes';

interface Props {
    cell: GridCell,
    x: number
    y: number
}

const MapCell = ({ cell, x, y }: Props) => {
    const { currentExplorer, currentExplorerOptions, selectExplorer, explorerMove } = useGameContext();
    const inOptions = () => {
        return !!(currentExplorerOptions && Object.values(currentExplorerOptions).find((opt) => {
            return (opt[0] === x && opt[1] === y) // if in options array
        }))
    }
    const specialStyles = () => {
        if (cell && cell === currentExplorer) return "bg-pink-300"; // if explorer cell
        if (inOptions()) return "bg-green-400 cursor-pointer";
        if (x === 2 && y === 2) return "bg-red-700"; // if middle cell
        return "bg-gray-200"; // 'regular cell'
    }
    const cellClick = () => {
        selectExplorer(cell)
        if (inOptions()) {
            explorerMove(x, y)
        }
    }

    return (
        <td
            key={x}
            onClick={cellClick}
            className={`flex flex-1 border-2 border-black ${specialStyles()}`}>
            {cell ?
                <ExplorerOnMap exp={cell} />
                :
                <div className="flex bg-slate-500 rounded-lg w-1/2 h-1/2 m-auto">
                    <div className="bg-slate-300 rounded-full w-3/5 h-3/5 m-auto border-2 border-gray-600"></div>
                </div>
            }
        </td>
    )
}

export default MapCell;