interface IQueue<T> {
    push(item: T): void;
    pop(): T | undefined;
    size(): number;
    peek(): T | undefined;
}
export class Queue<T> implements IQueue<T> {
    private storage: T[] = [];

    constructor(private capacity: number = Infinity) { }

    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Queue has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }
    pop(): T | undefined {
        return this.storage.shift();
    }
    peek(): T | undefined {
        return this.storage[0];
    }
    size(): number {
        return this.storage.length;
    }
}