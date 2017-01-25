class AmperfStorage {
    constructor() {
        this.storage = [];
        this.cache = [];

        return this;
    }

    add(data) {
        this.storage.push(data);
        return this;
    }

    get get() {
        return this.storage;
    }

    addToCache(data) {
        this.cache.push(data);
        return this;
    }

    clearCache() {
        this.cache = [];
        return this;
    }

    moveToStorage() {
        this.add(this.cache);
        this.clearCache();
        return this;
    }

    saveToFile(file) {

    }
}

export default AmperfStorage;
