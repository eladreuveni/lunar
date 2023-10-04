export type Explorer = 'orange' | 'green' | 'blue' | 'yellow' | 'red' | 'purple';
export type GridCell = '' | Explorer;
export type Direction = 'U' | 'D' | 'L' | 'R';

export type SolutionStep = [Explorer, Direction]

export type MapPositions = Array<GridCell[]>

export interface Card {
    level: number;
    setUp: MapPositions;
    solution: Array<SolutionStep>;
}

export const cardExample: Card = {
    level: 1,
    setUp: [
        ["", "", "", "", ""],
        ["", "", "", "purple", "orange"],
        ["yellow", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "green", "red"],
    ],
    solution: [["red", "D"], ["red", "L"], ["green", "U"], ["red", "R"]],
}

export const emptyMap: MapPositions = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

export type ExplorerOptions = { [K in Direction]?: [number, number] };
export type AllOptions = { [K in Explorer]?: ExplorerOptions };

export type Move = {
    explorer: Explorer;
    from: [number, number];
    to: [number, number];
}

export interface AddLevelInfo {
    explorersAvailable: Explorer[];
    setUpCompleted: boolean;
}