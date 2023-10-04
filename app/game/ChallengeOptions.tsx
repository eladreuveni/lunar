import React from 'react'
import SingleGameButton from './SingleGameButton'

const ChallengeOptions = () => {
    return (
        <footer className='sticky top-[100vh] flex justify-around items-center p-5'>
            <SingleGameButton text='prev'
                icon={{ path: 'l-arrow' }} />
            <span className='text-3xl'>Challenge 1</span>
            <SingleGameButton text='next'
                icon={{ path: 'r-arrow' }} />
        </footer>
    )
}

export default ChallengeOptions