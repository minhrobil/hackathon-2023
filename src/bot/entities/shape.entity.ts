export class Shape {
    constructor(
        highest: number, numOfHighest: number,
        lowest: number, numOfLowest: number,
        rightest: number, numOfRightest: number,
        leftest: number, numOfLeftest: number
    ) {
        this.highest = highest
        this.numOfHighest = numOfHighest
        this.lowest = lowest
        this.numOfLowest = numOfLowest
        this.rightest = rightest
        this.numOfRightest = numOfRightest
        this.leftest = leftest
        this.numOfLeftest = numOfLeftest
    }
    readonly highest: number;
    readonly numOfHighest: number;
    readonly lowest: number;
    readonly numOfLowest: number;
    readonly rightest: number;
    readonly numOfRightest: number;
    readonly leftest: number;
    readonly numOfLeftest: number;
}
