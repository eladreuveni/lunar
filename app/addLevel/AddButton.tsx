'use client';
import React from 'react'
import SingleGameButton from '../game/SingleGameButton'
import { useGameContext } from '../game/GameContext';

const AddButton = () => {
    const { currentMap, addLevelInfo } = useGameContext();
    const add = async () => {
        const body = {
            level: 4
        }
        const res = await fetch('http://localhost:3000/api/card/1', {
            method: 'POST', body: JSON.stringify(body)
        });
        console.log("🚀 ~ file: AddButton.tsx:17 ~ add ~ res:", res)
        // const { data } = await res.json();
    }
    return (
        <>
            {currentMap.length && currentMap[2][2] === 'red' &&
                <footer className='sticky top-[100vh] flex justify-around items-center p-5'>
                    <SingleGameButton
                        action={add}
                        text="Add Level !"
                    />
                </footer>
            }
        </>
    )
}

export default AddButton