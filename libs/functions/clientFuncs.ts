import confetti from "canvas-confetti";
import { Explorer } from "../types/gameTypes";

export const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

export const randomConfetti = () => {
    confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 }
    });
}

export const explorers: Explorer[] = ['blue', 'green', 'orange', 'purple', 'red', 'yellow']
