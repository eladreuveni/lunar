'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { AllOptions, ExplorerOptions, GridCell, MapPositions, cardExample, emptyMap } from "../types/gameTypes";

interface ContextValue {
    currentMap: MapPositions;
    currentExplorer: GridCell;
    selectExplorer: (exp: GridCell) => void;
    allOptions: AllOptions;
    currentExplorerOptions: ExplorerOptions | null | undefined;
    explorerMove: (toX: number, toY: number) => void;
}

const Context = createContext<ContextValue>({} as ContextValue);

export function GameProvider({ children }: { children: any }) {
    const [currentMap, setCurrentMap] = useState<MapPositions>(emptyMap);
    const [currentExplorer, setCurrentExplorer] = useState<GridCell>('');
    const [allOptions, setAllOptions] = useState<AllOptions>({});

    const selectExplorer = (exp: GridCell) => setCurrentExplorer(exp)

    useEffect(() => {
        setCurrentMap(cardExample.setUp);
    }, [])

    useEffect(() => {
        setCurrentExplorer('');
        checkAllOptions();
    }, [currentMap])

    const currentExplorerOptions = currentExplorer ? allOptions[currentExplorer] : null;

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

        for (let uY = expY - 2; uY >= 0; uY--) { // check Up
            if (uY < 0) break;
            if (currentMap[uY][expX]) {
                options.U = [expX, uY + 1]; break;
            }
        }

        for (let dY = expY + 2; dY <= 4; dY++) { // check Down
            if (dY > 4) break;
            if (currentMap[dY][expX]) {
                options.D = [expX, dY - 1]; break;
            }
        }

        for (let lX = expX - 2; lX >= 0; lX--) { // check Left
            if (lX < 0) break;
            if (currentMap[expY][lX]) {
                options.L = [lX + 1, expY]; break;
            }
        }

        for (let rX = expX + 2; rX <= 4; rX++) { // check Right
            if (rX > 4) break;
            if (currentMap[expY][rX]) {
                options.R = [rX - 1, expY]; break;
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

    const explorerMove = (toX: number, toY: number) => {
        setCurrentMap((map) => {
            const [fromX, fromY] = getCurrentExplorerPositions();
            map[fromY][fromX] = '';
            map[toY][toX] = currentExplorer;
            const newMap = [...map]
            return newMap;
        })
    }

    return (
        <Context.Provider
            value={{
                currentMap,
                currentExplorer,
                selectExplorer,
                allOptions,
                currentExplorerOptions,
                explorerMove
            }}>
            {children}
        </Context.Provider>
    );
}

export function useGameContext() {
    return useContext(Context);
}