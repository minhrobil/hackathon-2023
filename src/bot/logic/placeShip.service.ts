import { Injectable } from '@nestjs/common';
import { ShipDto } from '../dto/invite.dto';

@Injectable()
export class PlaceShipService {
  initBoard(board : Map<string, number>, boardWidth: number, boardHeight: number, water: number){
    for(let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        board.set(''+x+y, water)
      }
    }
  }

  getShipLocation(shipType: string, board : Map<string, number>){
    return {
      type: shipType,
      coordinates: [
        [0,1]
      ]
    }
  }

  placeShip(shipsInMyBoard, shipsInGame: ShipDto[], board : Map<string, number>){
    shipsInGame.forEach(shipType => {
      for (let ship = 0; ship < shipType.quantity; ship++) {
        shipsInMyBoard.push(this.getShipLocation(shipType.type, board))
      }
    });
  }
}