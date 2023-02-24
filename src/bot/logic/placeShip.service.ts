import { Injectable } from '@nestjs/common';
import { COORDINATE_STATUS, TACTIC } from '../constant/constant';
import { ShipDto } from '../dto/invite.dto';
import { Coordinate } from '../entities/coordinate.entity';
import { Queue } from './queue.service';
import { MyShipsDto } from '../dto/myShips.dto';
import { COORDINATE_TIGER_TATIC } from '../constant/coordinate.tiger.tatic';
import { Game } from './game.service';

@Injectable()
export class PlaceShipService {
  initBoard(myBoard: Map<string, number>, enemyBoard: Map<string, number>, boardWidth: number, boardHeight: number) {
    for (let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        myBoard.set('' + x + y, COORDINATE_STATUS.WATER)
        enemyBoard.set('' + x + y, COORDINATE_STATUS.WATER)
      }
    }
    // enemyBoard.set('175', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('185', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('195', COORDINATE_STATUS.SHIP)
    // enemyBoard.set('196', COORDINATE_STATUS.SHIP)

  }

  getShipLocation(shipType: string, board: Map<string, number>) {
    return {
      type: shipType,
      coordinates: [
        [0, 1]
      ]
    }
  }

  placeShip(game: Game, myShips: MyShipsDto) {
    const myBoard = game.getMyBoard()
    game.setShipsInMyBoard(myShips)
    myShips.ships.forEach(ship=>{
      ship.coordinates.forEach(coordinate=>{
        myBoard.set(''+coordinate['x']+coordinate['y'], COORDINATE_STATUS.SHIP)
      })
      
    })
    this.printBoard(myBoard, game.getBoardWidth(),game.getBoardHeight())
  }

  initHuntShotQueue(huntShotQueue: Queue<Coordinate>, currentTactic: number) {
    if (currentTactic === TACTIC.TIGER) {
      COORDINATE_TIGER_TATIC.forEach(coordinate => {
        huntShotQueue.push(new Coordinate(coordinate.x, coordinate.y))
      });
    }
  }

  printBoard(board: Map<string, number>, boardWidth: number, boardHeight: number) {
    for (let y = boardHeight - 1; y >= 0; y--) {
      process.stdout.write(y + '  ')
      for (let x = 0; x < boardWidth; x++) {
        const space = '  '
        // if(x>=10) space = '  '
        if (board.get('' + x + y) == COORDINATE_STATUS.WATER) {
          process.stdout.write('_' + space)
        }
        if (board.get('' + x + y) == COORDINATE_STATUS.SHOT) {
          process.stdout.write('O' + space)
        }
        if (board.get('' + x + y) == COORDINATE_STATUS.SHIP) {
          process.stdout.write('S' + space)
        }
        if (board.get('' + x + y) == COORDINATE_STATUS.SUNK) {
          process.stdout.write('X' + space)
        }
      }
      console.log('');
      console.log('');
    }
    for (let x = -1; x < boardWidth; x++) {
      if (x == -1) {
        process.stdout.write('   ')
      } else {
        if (x >= 10) {
          process.stdout.write(x + ' ')
        } else {
          process.stdout.write(x + '  ')
        }
      }
    }
    console.log('');
  }
}