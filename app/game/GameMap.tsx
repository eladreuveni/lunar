'use client';
import React from 'react'
import { useGameContext } from './GameContext';
import MapCell from './MapCell';
import CoolLoader from '../components/CoolLoader';

const GameMap = () => {
  const { currentMap } = useGameContext();
  return (
    <div className='flex justify-center'>
      {!currentMap.length ? <CoolLoader /> :
        <table>
          <tbody className="flex flex-col w-64 h-64">
            {currentMap.map((row, y) => {
              return <tr className="flex-1 flex" key={y}>
                {row.map((cell, x) => {
                  return <MapCell key={`${x}${y}`} cell={cell} x={x} y={y} />
                })}
              </tr>
            })}
          </tbody>
        </table>}
    </div>
  )
}

export default GameMap