import React from "react";
import GameMap from "./GameMap";
import { GameProvider } from "./GameContext";
import GameButtons from "./GameButtons";
import ChallengeOptions from "./ChallengeOptions";

const GamePage = () => {
  return <GameProvider addLevelMode={false}>
    <GameButtons />
    <GameMap />
    <ChallengeOptions />
  </GameProvider>
};

export default GamePage;
