export const BOTTOM_LEFT_CORNER = [
    {x: 0, y: 0},
]
export const BOTTOM_RIGHT_CORNER = [
    {x: 19, y: 0},
]
export const TOP_LEFT_CORNER = [
    {x: 0, y: 7},
]
export const TOP_RIGHT_CORNER = [
    {x: 19, y: 7},
]
export const CORNER = [...BOTTOM_LEFT_CORNER, ...BOTTOM_RIGHT_CORNER, ...TOP_LEFT_CORNER, ...TOP_RIGHT_CORNER]

export const BOTTOM_LEFT_CORNER_2 = [
    {x: 1, y: 1},
]
export const BOTTOM_RIGHT_CORNER_2 = [
    {x: 18, y: 1},
]
export const TOP_LEFT_CORNER_2 = [
    {x: 1, y: 6},
]
export const TOP_RIGHT_CORNER_2 = [
    {x: 18, y: 6},
]
export const CORNER_2 = [...BOTTOM_LEFT_CORNER_2, ...BOTTOM_RIGHT_CORNER_2, ...TOP_LEFT_CORNER_2, ...TOP_RIGHT_CORNER_2]
export const CORNER_SOLID = [...CORNER, ...CORNER_2]
