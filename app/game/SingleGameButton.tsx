import React from 'react'

type Props = {
    text?: string
    icon?: {
        path: string
        size?: string
        extraStyle?: string
    }
    action?: () => void
}

const SingleGameButton = ({ text, icon, action }: Props) => {
    return (
        <button onClick={action} className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded flex justify-between items-center">
            {icon ? <img src={`/game_assets/${icon.path}.svg`} className={`${icon.extraStyle} p-2 h-14`} alt={icon.path} /> : ""}
            {text ? <span className='p-3 text-lg font-semibold'>{text}</span> : ""}
        </button>
    )
}

export default SingleGameButton