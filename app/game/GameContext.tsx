'use client';
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AddLevelInfo, AllOptions, Card, Explorer, ExplorerOptions, GridCell, MapPositions, Move, emptyMap } from "../../libs/types/gameTypes";
import { explorers, randomConfetti } from "@/libs/functions/clientFuncs";

interface ContextValue {
    currentMap: MapPositions;
    currentExplorer: GridCell;
    selectExplorer: (exp: GridCell) => void;
    allOptions: AllOptions;
    currentExplorerOptions: ExplorerOptions | null | undefined;
    explorerMove: (toX: number, toY: number) => void;
    resetMap: () => void;
    undoLastMove: () => void;
    addLevelMode: boolean;
    addLevelPositionExplorer(x: number, y: number): void;
    addLevelInfo: AddLevelInfo;
    toggleSetUpCompleted: () => void;
}

const reactIsStupid = (prev: MapPositions) => {
    const newArr: MapPositions = [];
    for (let y = 0; y < prev.length; y++) {
        newArr[y] = [...prev[y]]
    }
    return [...newArr]
}

let winInterval: number | null = null;
const Context = createContext<ContextValue>({} as ContextValue);

export function GameProvider({ children, addLevelMode }: { children: ReactNode, addLevelMode: boolean }) {
    const [currentCard, setCurrentCard] = useState<Card>({} as Card);
    const [currentMap, setCurrentMap] = useState<MapPositions>([]);
    const [currentExplorer, setCurrentExplorer] = useState<GridCell>('');
    const [allOptions, setAllOptions] = useState<AllOptions>({});
    const [allMoves, setAllMoves] = useState<Move[]>([]);
    const [addLevelInfo, setAddLevelInfo] = useState<AddLevelInfo>({} as AddLevelInfo);

    const selectExplorer = (exp: GridCell) => setCurrentExplorer(exp)

    useEffect(() => {
        addLevelMode ? initAddLevel() : fetchCard();
    }, [])

    useEffect(() => {
        setCurrentExplorer('');
        checkAllOptions();
        if (currentMap.length && currentMap[2][2] === 'red') {
            infiniteConfetti();
        } else {
            clearInterval(winInterval!);
        }
    }, [currentMap])

    const initAddLevel = () => {
        setCurrentCard({
            level: 0,
            setUp: emptyMap,
            solution: []
        });
        setCurrentMap(reactIsStupid(emptyMap));
        setAddLevelInfo({
            explorersAvailable: explorers,
            setUpCompleted: false
        })
        setAllMoves([]);
    }

    const fetchCard = async () => {
        const res = await fetch('http://localhost:3000/api/card/1');
        const { data } = await res.json();
        setCurrentCard(data);
        setCurrentMap(reactIsStupid(data.setUp));
        setAllMoves([]);
    }

    const currentExplorerOptions = currentExplorer ? allOptions[currentExplorer] : null;

    const infiniteConfetti = () => {
        randomConfetti();
        winInterval = window.setInterval(() => {
            randomConfetti();
        }, 1000)
    }

    const resetMap = () => {
        if (addLevelMode) {
            initAddLevel();
        } else {
            setCurrentMap(reactIsStupid(currentCard.setUp));
            setAllMoves([]);
        }
    }
    const undoLastMove = () => {
        if (!allMoves.length) return;
        const { explorer, from, to } = allMoves[allMoves.length - 1];
        moveOnMap({ explorer, from: to, to: from })
        setAllMoves(arr => {
            arr.pop();
            return arr
        });
    }

    const addLevelPositionExplorer = (x: number, y: number) => {
        setAddLevelInfo(i => {
            return {
                ...i,
                explorersAvailable: i.explorersAvailable.filter(e => e !== currentExplorer),
            }
        })
        setCurrentMap(map => {
            map[y][x] = currentExplorer;
            return [...map]
        })
    }

    const toggleSetUpCompleted = () => {
        setAddLevelInfo(i => ({ ...i, setUpCompleted: !i.setUpCompleted }))
    }

    const checkAllOptions = () => {
        const options: AllOptions = {}
        for (let y = 0; y < currentMap.length; y++) {
            for (let x = 0; x < currentMap[y].length; x++) {
                const explorer = currentMap[y][x];
                if (explorer) {
                    const explorerOptions = checkExplorerOptions(x, y);
                    if (explorerOptions) { options[explorer] = explorerOptions }
                }
            }
        }
        setAllOptions(options);
    }

    const checkExplorerOptions = (expX: number, expY: number) => {

        if (expX < 0 || expY < 0) {
            return null; // no explorer
        }

        const options: ExplorerOptions = {};

        if (expY - 1 >= 0 && !currentMap[expY - 1][expX]) {
            for (let uY = expY - 2; uY >= 0; uY--) { // check Up
                if (uY < 0) break;
                if (currentMap[uY][expX]) {
                    options.U = [expX, uY + 1]; break;
                }
            }
        }

        if (expY + 1 <= 4 && !currentMap[expY + 1][expX]) {
            for (let dY = expY + 2; dY <= 4; dY++) { // check Down
                if (dY > 4) break;
                if (currentMap[dY][expX]) {
                    options.D = [expX, dY - 1]; break;
                }
            }
        }

        if (expX - 1 >= 0 && !currentMap[expY][expX - 1]) {
            for (let lX = expX - 2; lX >= 0; lX--) { // check Left
                if (lX < 0) break;
                if (currentMap[expY][lX]) {
                    options.L = [lX + 1, expY]; break;
                }
            }
        }

        if (expX + 1 <= 4 && !currentMap[expY][expX + 1]) {
            for (let rX = expX + 2; rX <= 4; rX++) { // check Right
                if (rX > 4) break;
                if (currentMap[expY][rX]) {
                    options.R = [rX - 1, expY]; break;
                }
            }
        }

        return (Object.keys(options).length) ? options : null;
    }

    const getCurrentExplorerPositions: () => [number, number] = () => {
        if (!currentExplorer) return [-1, -1];
        for (let y = 0; y < currentMap.length; y++) {
            for (let x = 0; x < currentMap[y].length; x++) {
                if (currentMap[y][x] === currentExplorer) return [x, y]
            }
        }
        return [-1, -1] // error
    }

    const moveOnMap = ({ explorer, from, to }: Move) => {
        setCurrentMap(map => {
            map[from[1]][from[0]] = '';
            map[to[1]][to[0]] = explorer;
            const newMap = [...map]
            return newMap;
        });
    }
    const addMoveToList = (move: Move) => {
        setAllMoves(arr => {
            arr.push(move)
            return arr;
        });
    }

    const explorerMove = (toX: number, toY: number) => {
        const from = getCurrentExplorerPositions();
        const move: Move = {
            explorer: currentExplorer as Explorer,
            from: from,
            to: [toX, toY]
        };
        moveOnMap(move)
        addMoveToList(move)
    }

    return (
        <Context.Provider
            value={{
                currentMap,
                currentExplorer,
                selectExplorer,
                allOptions,
                currentExplorerOptions,
                explorerMove,
                resetMap,
                undoLastMove,
                addLevelMode,
                addLevelPositionExplorer,
                addLevelInfo,
                toggleSetUpCompleted,
            }}>
            {children}
        </Context.Provider>
    );
}

export function useGameContext() {
    return useContext(Context);
}