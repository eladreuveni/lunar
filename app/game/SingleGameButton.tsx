import React from 'react'

type Props = {
    text: string
    icon?: {
        path: string
        size?: string
        extraStyle?: string
    }
}

const SingleGameButton = ({ text, icon }: Props) => {
    return (
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded flex justify-between items-center">
            {icon ? <img src={`/game_assets/${icon.path}.svg`} className={`${icon.extraStyle} p-2 h-14`} alt={text} /> : ""}
        </button>
    )
}

export default SingleGameButton