import { explorers } from '@/libs/functions/clientFuncs'
import React from 'react'

const CoolLoader = () => {
    return (
        <div className='flex m-5'>
            {explorers.map(e => (
                <img
                    key={e}
                    className={`animate-shake justify-center h-12`}
                    src={`/game_assets/${e}.svg`}
                    alt={e}
                />
            ))}
        </div>
    )
}

export default CoolLoader