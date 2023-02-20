export const TACTIC = {
    TIGER: 0, //Chiến thuật bắt đầu từ trung tâm bản đồ
    WOLF: 1, //Chiến thuật bắt đầu từ 
    SNAKE: 2 //Bắn trượt
}
export const COORDINATE_STATUS = {
    WATER: 0, //Chưa bắn vào ô này
    SHIP: 1, //Bắn trúng tàu 
    SHOT: 2 //Bắn trượt
}

export const MISSION_TYPE = {
    HUNTING: 0, //Chế độ đi săn
    TARGETING: 1, //Chế độ khoá mục tiêu
}

// Infor tàu
export const SHIP_TYPE = {
    CARRIER: 'CV',
    BATTLE_SHIP: 'BB',
    OIL_RIG: 'OR',
    CRUISER: 'CA',
    DESTROYER: 'DD'
}

export const  DIRECTION_ = {
    VERTICAL: 'VER',
    HORIZONTAL: 'HOR'
}

export const DIRECTION = [DIRECTION_.HORIZONTAL, DIRECTION_.VERTICAL]

export const SHIP_TYPE_ = {
    CARRIER: {
        'pieces': 5,
        HORIZONTAL: [
            {'x': 0, 'y': 1},
            {'x': 1, 'y': 1},
            {'x': 2, 'y': 1},
            {'x': 3, 'y': 1},
            {'x': 1, 'y': 0}
        ],
        VERTICAL: [
            {'x': 1, 'y': 0},
            {'x': 1, 'y': 1},
            {'x': 1, 'y': 2},
            {'x': 1, 'y': 3},
            {'x': 0, 'y': 1},
        ]
    },
    BATTLE_SHIP: {
        'pieces': 4,
        HORIZONTAL: [
            {'x': 0, 'y': 0},
            {'x': 1, 'y': 0},
            {'x': 2, 'y': 0},
            {'x': 3, 'y': 0}
        ],
        VERTICAL: [
            {'x': 0, 'y': 0},
            {'x': 0, 'y': 1},
            {'x': 0, 'y': 2},
            {'x': 0, 'y': 3}
        ]
    },
    CRUISER: {
        'pieces': 3,
        HORIZONTAL: [
            {'x': 0, 'y': 0},
            {'x': 1, 'y': 0},
            {'x': 2, 'y': 0}
        ],
        VERTICAL: [
            {'x': 0, 'y': 0},
            {'x': 0, 'y': 1},
            {'x': 0, 'y': 2}
        ]
    },
    DESTROYER: {
        'pieces': 2,
        HORIZONTAL: [
            {'x': 0, 'y': 0},
            {'x': 1, 'y': 0}
        ],
        VERTICAL: [
            {'x': 0, 'y': 0},
            {'x': 0, 'y': 1}
        ]
    },
    OIL_RIG: {
        'pieces': 4,
        HORIZONTAL: [
            {'x': 0, 'y': 0},
            {'x': 0, 'y': 1},
            {'x': 1, 'y': 0},
            {'x': 1, 'y': 1}
        ],
        VERTICAL: [
            {'x': 0, 'y': 0},
            {'x': 0, 'y': 1},
            {'x': 1, 'y': 0},
            {'x': 1, 'y': 1}
        ]
    }
}
