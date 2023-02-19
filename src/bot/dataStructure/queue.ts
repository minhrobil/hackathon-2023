interface IQueue<T> {
    add(item: T): void;
    shift(): T | undefined;
    size(): number;
}

class Queue<T> implements IQueue<T> {
    private storage: T[] = [];

    constructor(private capacity: number = Infinity) { }

    add(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Queue has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }
    shift(): T | undefined {
        return this.storage.shift();
    }
    size(): number {
        return this.storage.length;
    }
}