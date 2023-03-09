import moment, { Moment } from "moment";
import { MISSION_TYPE, TACTIC } from "../constant/constant";
import { MyShipsDto } from "../dto/myShips.dto";
import { Coordinate } from "../entities/coordinate.entity";
import { Queue } from "./queue.service";

export class Game {
    constructor(session: string) {
        this.session = session
    }

    //Thong tin game
    private session = '';
    private lastAccess: Moment;
    //Thong tin quan ta
    private currentTactic: string;//Chien dich 
    private boardWidth = 0
    private boardHeight = 0
    private countHunting = 0
    private countTargeting = 0
    private player1 = ''
    private player2 = ''
    private currentMission: string = MISSION_TYPE.HUNTING; //Mission hiện tại
    private myBoard: Map<string, string> = new Map()//Bản đồ quân ta
    private shipsInMyBoard: MyShipsDto = new MyShipsDto()
    //Phan thong tin ke dich
    private enemyBoard: Map<string, string> = new Map(); //Bản đồ quân địch
    private huntShotQueue: Queue<Coordinate> = new Queue()//Queue các toạ độ sẽ đi hunting theo chiến dịch ban dau
    private shipCoordinatesInCurrentTargetArea: Array<Coordinate> = []//Danh sach cac toa do tau trong vung target hien tai
    private targetShotQueue: Queue<Coordinate> = new Queue()//Queue các toạ độ sẽ đi target trong vung hien tai
    private shipsInEnermyBoard: MyShipsDto = new MyShipsDto()

      /**
     * Getter currentMission
     * @return {Moment }
     */

      public getLastAccess(): Moment {
        return this.lastAccess;
    }

    /**
     * Setter currentMission
     * @param {Moment } value
     */
    public setLastAccess(value: Moment) {
        this.lastAccess = value;
    }

    /**
     * Getter currentMission
     * @return {string }
     */

    public getCurrentMission(): string {
        return this.currentMission;
    }

    /**
     * Setter currentMission
     * @param {string } value
     */
    public setCurrentMission(value: string) {
        this.currentMission = value;
    }

    /**
     * Getter boardWidth
     * @return {number }
     */
    public getBoardWidth(): number {
        return this.boardWidth;
    }

    /**
     * Getter countHunting
     * @return {number }
     */
    public getCountHunting(): number {
        return this.countHunting;
    }

    /**
     * Getter boardWidth
     * @return {number }
     */
    public getCountTargeting(): number {
        return this.countTargeting;
    }
    /**
     * Setter countTargeting
     * @param {number } value
     */
    public setCountTargeting(value: number) {
        this.countTargeting = value;
    }

    /**
     * Setter countHunting
     * @param {number } value
     */
    public setCountHunting(value: number) {
        this.countHunting = value;
    }

    /**
     * Getter boardHeight
     * @return {number }
     */
    public getBoardHeight(): number {
        return this.boardHeight;
    }

    /**
     * Getter player1
     * @return {string }
     */
    public getPlayer1(): string {
        return this.player1;
    }

    /**
     * Getter player2
     * @return {string }
     */
    public getPlayer2(): string {
        return this.player2;
    }

    /**
     * Setter boardWidth
     * @param {number } value
     */
    public setBoardWidth(value: number) {
        this.boardWidth = value;
    }

    /**
     * Setter boardHeight
     * @param {number } value
     */
    public setBoardHeight(value: number) {
        this.boardHeight = value;
    }

    /**
     * Setter player1
     * @param {string } value
     */
    public setPlayer1(value: string) {
        this.player1 = value;
    }

    /**
     * Setter player2
     * @param {string } value
     */
    public setPlayer2(value: string) {
        this.player2 = value;
    }


    /**
     * Getter session
     * @return {string }
     */
    public getSession(): string {
        return this.session;
    }

    /**
     * Getter currentTactic
     * @return {string }
     */
    public getCurrentTactic(): string {
        return this.currentTactic;
    }

    /**
     * Getter myBoard
     * @return {Map<string, number> }
     */
    public getMyBoard(): Map<string, string> {
        return this.myBoard;
    }

    /**
     * Getter enemyBoard
     * @return {Map<string, number> }
     */
    public getEnemyBoard(): Map<string, string> {
        return this.enemyBoard;
    }

    /**
     * Getter huntShotQueue
     * @return {Queue<Coordinate> }
     */
    public getHuntShotQueue(): Queue<Coordinate> {
        return this.huntShotQueue;
    }

    /**
     * Getter getShipCoordinatesInCurrentTargetArea
     * @return {Array<Coordinate> }
     */
    public getShipCoordinatesInCurrentTargetArea(): Array<Coordinate> {
        return this.shipCoordinatesInCurrentTargetArea;
    }

    /**
     * Setter session
     * @param {string } value
     */
    public setSession(value: string) {
        this.session = value;
    }

    /**
     * Setter currentTactic
     * @param {string } value
     */
    public setCurrentTactic(value: string) {
        this.currentTactic = value;
    }

    /**
     * Setter myBoard
     * @param {Map<string, number> } value
     */
    public setMyBoard(value: Map<string, string>) {
        this.myBoard = value;
    }

    /**
     * Setter enemyBoard
     * @param {Map<string, number> } value
     */
    public setEnemyBoard(value: Map<string, string>) {
        this.enemyBoard = value;
    }

    /**
     * Setter huntShotQueue
     * @param {Queue<Coordinate> } value
     */
    public setHuntShotQueue(value: Queue<Coordinate>) {
        this.huntShotQueue = value;
    }

    /**
     * Setter setShipCoordinatesInCurrentTargetArea
     * @param {Array<Coordinate> } value
     */
    public setShipCoordinatesInCurrentTargetArea(value: Array<Coordinate>) {
        this.shipCoordinatesInCurrentTargetArea = value;
    }

    /**
     * Getter shipsInMyBoard
     * @return {MyShipsDto }
     */
    public getShipsInMyBoard(): MyShipsDto {
        return this.shipsInMyBoard;
    }

    /**
     * Setter shipsInMyBoard
     * @param {MyShipsDto } value
     */
    public setShipsInMyBoard(value: MyShipsDto) {
        this.shipsInMyBoard = value;
    }

    /**
     * Getter targetShotQueue
     * @return {Queue<Coordinate> }
     */
    public getTargetShotQueue(): Queue<Coordinate> {
        return this.targetShotQueue;
    }

    /**
     * Setter targetShotQueue
     * @param {Queue<Coordinate> } value
     */
    public setTargetShotQueue(value: Queue<Coordinate>) {
        this.targetShotQueue = value;
    }


    /**
     * Getter shipsInEnermyBoard
     * @return {MyShipsDto }
     */
    public getShipsInEnermyBoard(): MyShipsDto {
        return this.shipsInEnermyBoard;
    }

    /**
     * Setter shipsInEnermyBoard
     * @param {MyShipsDto } value
     */
    public setShipsInEnermyBoard(value: MyShipsDto) {
        this.shipsInEnermyBoard = value;
    }
}