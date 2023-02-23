export const TACTIC = {
    TIGER: 0, //Chiến thuật Tiger
    WOLF: 1, //Chiến thuật Wolf
    SNAKE: 2 //Chien thuat Snake
}
export const COORDINATE_STATUS = {
    WATER: 1, //Chưa bắn vào ô này
    SHIP: 2, //Bắn trúng tàu, chưa chìm
    SHOT: 3, //Bắn vào ô không có tàu
    SUNK: 4 //Vị trí đã chìm của tàu 
}

export const MISSION_TYPE = {
    HUNTING: 0, //Chế độ đi săn
    TARGETING: 1, //Chế độ khoá mục tiêu
}

export const STATUS_SHOT = {
    MISS: "MISS",
    HIT: "HIT",
}

export const MY_PLAYER_ID = "BAOTHU"