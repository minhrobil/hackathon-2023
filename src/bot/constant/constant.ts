export const TACTIC = {
    TIGER: 0, //Chiến thuật bắt đầu từ trung tâm bản đồ
    WOLF: 1, //Chiến thuật bắt đầu từ 
    SNAKE: 2 //Bắn trượt
}
export const COORDINATE_STATUS = {
    WATER: 0, //Chưa bắn vào ô này
    SHIP: 1, //Bắn trúng tàu, chưa chìm
    SHOT: 2, //Bắn vào ô không có tàu
    SUNK: 3 //Vị trí đã chìm của tàu 
}

export const MISSION_TYPE = {
    HUNTING: 0, //Chế độ đi săn
    TARGETING: 1, //Chế độ khoá mục tiêu
}