import { MISSION_TYPE, TACTIC } from "../constant/constant";
import { ShipDto } from "../dto/invite.dto";
import { MyShipsDto } from "../dto/myShips.dto";
import { Coordinate } from "../entities/coordinate.entity";
import { Queue } from "./queue.service";

export class Game {
    constructor(session: string) {
        this.session = session
    }

    //Thong tin game
    private session: string = '';

    //Thong tin quan ta
    private currentTactic: number = TACTIC.TIGER //Chien dich 
    private boardWidth: number = 0
    private boardHeight: number = 0
    private player1: string = ''
    private player2: string = ''
    private currentMission: number = MISSION_TYPE.HUNTING; //Mission hiện tại
    private myBoard: Map<string, number> = new Map()//Bản đồ quân ta
    private shipsInMyBoard: MyShipsDto = new MyShipsDto()
    //Phan thong tin ke dich
    private enemyBoard: Map<string, number> = new Map(); //Bản đồ quân địch
    private huntShotQueue: Queue<Coordinate> = new Queue()//Queue các toạ độ sẽ đi hunting theo chiến dịch ban dau
    private shipCoordinateQueue: Queue<Coordinate> = new Queue()//Queue toa do da ban trung tau trong lan target hien tai

    /**
     * Getter currentMission
     * @return {number }
     */
	public getCurrentMission(): number  {
		return this.currentMission;
	}

    /**
     * Setter currentMission
     * @param {number } value
     */
	public setCurrentMission(value: number ) {
		this.currentMission = value;
	}

    /**
     * Getter boardWidth
     * @return {number }
     */
	public getBoardWidth(): number  {
		return this.boardWidth;
	}

    /**
     * Getter boardHeight
     * @return {number }
     */
	public getBoardHeight(): number  {
		return this.boardHeight;
	}

    /**
     * Getter player1
     * @return {string }
     */
	public getPlayer1(): string  {
		return this.player1;
	}

    /**
     * Getter player2
     * @return {string }
     */
	public getPlayer2(): string  {
		return this.player2;
	}

    /**
     * Setter boardWidth
     * @param {number } value
     */
	public setBoardWidth(value: number ) {
		this.boardWidth = value;
	}

    /**
     * Setter boardHeight
     * @param {number } value
     */
	public setBoardHeight(value: number ) {
		this.boardHeight = value;
	}

    /**
     * Setter player1
     * @param {string } value
     */
	public setPlayer1(value: string ) {
		this.player1 = value;
	}

    /**
     * Setter player2
     * @param {string } value
     */
	public setPlayer2(value: string ) {
		this.player2 = value;
	}


    /**
     * Getter session
     * @return {string }
     */
	public getSession(): string  {
		return this.session;
	}

    /**
     * Getter currentTactic
     * @return {number }
     */
	public getCurrentTactic(): number  {
		return this.currentTactic;
	}

    /**
     * Getter myBoard
     * @return {Map<string, number> }
     */
	public getMyBoard(): Map<string, number>  {
		return this.myBoard;
	}

    /**
     * Getter enemyBoard
     * @return {Map<string, number> }
     */
	public getEnemyBoard(): Map<string, number>  {
		return this.enemyBoard;
	}

    /**
     * Getter huntShotQueue
     * @return {Queue<Coordinate> }
     */
	public getHuntShotQueue(): Queue<Coordinate>  {
		return this.huntShotQueue;
	}

    /**
     * Getter shipCoordinateQueue
     * @return {Queue<Coordinate> }
     */
	public getShipCoordinateQueue(): Queue<Coordinate>  {
		return this.shipCoordinateQueue;
	}

    /**
     * Setter session
     * @param {string } value
     */
	public setSession(value: string ) {
		this.session = value;
	}

    /**
     * Setter currentTactic
     * @param {number } value
     */
	public setCurrentTactic(value: number ) {
		this.currentTactic = value;
	}

    /**
     * Setter myBoard
     * @param {Map<string, number> } value
     */
	public setMyBoard(value: Map<string, number> ) {
		this.myBoard = value;
	}

    /**
     * Setter enemyBoard
     * @param {Map<string, number> } value
     */
	public setEnemyBoard(value: Map<string, number> ) {
		this.enemyBoard = value;
	}

    /**
     * Setter huntShotQueue
     * @param {Queue<Coordinate> } value
     */
	public setHuntShotQueue(value: Queue<Coordinate> ) {
		this.huntShotQueue = value;
	}

    /**
     * Setter shipCoordinateQueue
     * @param {Queue<Coordinate> } value
     */
	public setShipCoordinateQueue(value: Queue<Coordinate> ) {
		this.shipCoordinateQueue = value;
	}

    /**
     * Getter shipsInMyBoard
     * @return {MyShipsDto }
     */
	public getShipsInMyBoard(): MyShipsDto  {
		return this.shipsInMyBoard;
	}

    /**
     * Setter shipsInMyBoard
     * @param {MyShipsDto } value
     */
	public setShipsInMyBoard(value: MyShipsDto ) {
		this.shipsInMyBoard = value;
	}
}