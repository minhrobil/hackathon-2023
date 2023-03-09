import { Coordinate } from "../entities/coordinate.entity"

export const makeCVCoordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if (x == 0 && y == 0) continue
            if ((x - y) % 4 == 0) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeBBCoordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x - y) % 4 == 0) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeCACoordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x - y) % 3 == 0) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeORCoordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x % 2 == 1) && (y % 2 == 1)) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeDDCoordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x - y) % 2 == 0) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }