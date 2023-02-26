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

export const SHIP_FINDING_STATUS = {
    KILLED: "KILLED",
    FINDING: "FINDING",
}

export const TWO_SHAPE_AREA_TYPE = {
    TWO_1: "TWO_1", //2 o hang ngang
    TWO_2: "TWO_2", //2 o hang doc
}

export const THREE_SHAPE_AREA_TYPE = {
    THREE_1: "THREE_1", // 3 o hang ngang
    THREE_2: "THREE_2", // 3 o hang doc
    THREE_3: "THREE_3", // 3 o cheo, thieu ô hang duoi ben phai,
    THREE_4: "THREE_4", // 3 o cheo, thieu ô hang duoi ben trai
    THREE_5: "THREE_5", // 3 o cheo, thieu ô hang tren ben phai
    THREE_6: "THREE_6", // 3 o cheo, thieu ô hang tren ben trai
}

export const FOUR_SHAPE_AREA_TYPE = {
    FOUR_1: "FOUR_1", // CV ngang, thiếu mấu bên dưới
    FOUR_2: "FOUR_2", // CV dọc, thiếu mấu bên phải
    FOUR_3: "FOUR_3", // CV dọc, thiếu ô dưới cùng
    FOUR_4: "FOUR_4", // CV dọc, thiếu ô trên cùng
    FOUR_5: "FOUR_5", // CV ngang, thiếu ô bên trái
    FOUR_6: "FOUR_6", // CV ngang, thiếu ô bên phải
    FOUR_7: "FOUR_7", // 2*2 OR
}

export const MULTIPLE_SHAPE_AREA_TYPE = "MULTIPLE_SHAPE_AREA_TYPE"
export const EMPTY_SHAPE_AREA_TYPE = "EMPTY_SHAPE_AREA_TYPE"

export const SHIP_TYPE = {
    CV: "CV",
    BB: "BB",
    OR: "OR",
    CA: "CA",
    DD: "DD"
}

export const MY_PLAYER_ID = "BAOTHU"