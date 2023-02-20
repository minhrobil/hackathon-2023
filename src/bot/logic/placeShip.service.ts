import { Injectable } from '@nestjs/common';
import { TACTIC } from '../constant/constant';
import { ShipDto } from '../dto/invite.dto';
import { Coordinate } from '../entities/coordinate.entity';
import { Stack } from './stack.service';

@Injectable()
export class PlaceShipService {
  initBoard(myBoard: Map<string, number>, enemyBoard: Map<string, number>, boardWidth: number, boardHeight: number, water: number) {
    for (let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        myBoard.set('' + x + y, water)
        enemyBoard.set('' + x + y, water)
      }
    }
  }

  getShipLocation(shipType: string, board: Map<string, number>) {
    
    return {
      type: shipType,
      coordinates: [
        [0, 1]
      ]
    }
  }

  placeShip(shipsInMyBoard, shipsInGame: ShipDto[], board: Map<string, number>) {
    shipsInGame.forEach(shipType => {
      for (let ship = 0; ship < shipType.quantity; ship++) {
        shipsInMyBoard.push(this.getShipLocation(shipType.type, board))
      }
    });
  }

  initHuntShotStack(huntShotStack: Stack<Coordinate>, boardWidth: number, boardHeight: number, currentTactic: number) {
    const boardSize: number = boardHeight * boardWidth
    if (currentTactic === TACTIC.TIGER) {
      const xRoot: number = Math.floor(boardWidth / 2)
      const yRoot: number = Math.floor(boardHeight / 2)
      let xLeft = xRoot
      let xRight = xRoot + 1
      let yDown = yRoot
      let yUp = yRoot + 1
      const huntShotSize = huntShotStack.size()
      while (xLeft > 0 || xRight < boardWidth - 1 || yDown > 0 || yUp < boardHeight - 1) {
        // Thay đổi toạ độ tìm kiếm theo chiều kim đồng hồ 
        if (huntShotSize % 4 == 0 && yUp < boardHeight - 1) {
          huntShotStack.push(new Coordinate(xRoot, yUp))
          yUp++;
          continue
        }
        if (huntShotSize % 4 == 1 && xRight < boardWidth - 1) {
          huntShotStack.push(new Coordinate(xRight, yRoot))
          xRight++;
          continue
        }
        if (huntShotSize % 4 == 2 && yDown > 0) {
          huntShotStack.push(new Coordinate(xRoot, yDown))
          yDown--;
          continue
        }
        if (huntShotSize % 4 == 3 && xLeft > 0) {
          huntShotStack.push(new Coordinate(xLeft, yRoot))
          xLeft--;
          continue
        }
      }
    }
  }
}