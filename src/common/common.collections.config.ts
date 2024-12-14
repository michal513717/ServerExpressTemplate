

export abstract class Collection {

    private collection: Record<string, any>;

    constructor() {
        this.collection = {};
    }

    getById<T>(collectionId: string): T {
        if (!this.collection[collectionId]) console.warn(`Class collection ${collectionId} doesn't exist!`);

        return this.collection[collectionId];
    }

    add(id: string, collection: any): void {
        if (this.collection[id]) return;

        this.collection[id] = collection;
    }
}