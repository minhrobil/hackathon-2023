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
export const makeCV1Coordinate = (): Coordinate[] => {
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
export const makeCV2Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if (x == 0 && y == 0) continue
            if ((x - y) % 4 == 1) {
                result.push(new Coordinate(x,y))
            }
            if ((y - x) % 4 == 3) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeCV3Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if (x == 0 && y == 0) continue
            if ((x - y) % 4 == 2) {
                result.push(new Coordinate(x,y))
            }
            if ((y - x) % 4 == 2) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeCV4Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if (x == 0 && y == 0) continue
            if ((x - y) % 4 == 3) {
                result.push(new Coordinate(x,y))
            }
            if ((y - x) % 4 == 1) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeCV5Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if (x == 0 && y == 0) continue
            if ((x + y) % 4 == 3) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeCV6Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if (x == 0 && y == 0) continue
            if ((x + y) % 4 == 2) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeCV7Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if (x == 0 && y == 0) continue
            if ((x + y) % 4 == 1) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeCV8Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if (x == 0 && y == 0) continue
            if ((x + y) % 4 == 0) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeBB1Coordinate = (): Coordinate[] => {
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
export const makeBB2Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x - y) % 4 == 1) {
                result.push(new Coordinate(x,y))
            }
            if ((y - x) % 4 == 3) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeBB3Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x - y) % 4 == 2) {
                result.push(new Coordinate(x,y))
            }
            if ((y - x) % 4 == 2) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeBB4Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x - y) % 4 == 3) {
                result.push(new Coordinate(x,y))
            }
            if ((y - x) % 4 == 1) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeBB5Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x + y) % 4 == 3) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeBB6Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x + y) % 4 == 2) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeBB7Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x + y) % 4 == 1) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeBB8Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x + y) % 4 == 0) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeCA1Coordinate = (): Coordinate[] => {
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
export const makeCA2Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x - y) % 3 == 1) {
                result.push(new Coordinate(x,y))
            }
            if ((y - x) % 3 == 2) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeCA3Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x - y) % 3 == 2) {
                result.push(new Coordinate(x,y))
            }
            if ((y - x) % 3 == 1) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeCA4Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x + y) % 3 == 0) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeCA5Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x + y) % 3 == 1) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeCA6Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x + y) % 3 == 2) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeOR1Coordinate = (): Coordinate[] => {
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
export const makeOR2Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x % 2 == 1) && (y % 2 == 0)) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeOR3Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x % 2 == 0) && (y % 2 == 1)) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeOR4Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x % 2 == 0) && (y % 2 == 0)) {
                result.push(new Coordinate(x,y))
            }
        }
    }
    shuffle(result)
    return result
}
export const makeDD1Coordinate = (): Coordinate[] => {
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
export const makeDD2Coordinate = (): Coordinate[] => {
    const result: Coordinate[] = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 20; x++) {
            if ((x - y) % 2 == 1) {
                result.push(new Coordinate(x,y))
            }
            if ((y - x) % 2 == 1) {
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