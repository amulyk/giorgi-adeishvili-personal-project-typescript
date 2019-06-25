import { ScenarioInterface } from "./schema";
import { LogInterface } from "./schema";
export class Transaction {
    public scenario: ScenarioInterface;
    public store: object | null;
    public logs: LogInterface[];
    public log: LogInterface;

    constructor() {
        this.store = {};
        this.logs = [];
    }

    public async dispatch(scenario: ScenarioInterface) {
        this.scenario = scenario;
        const id: number[] = this.getIndex();
        let i: number = 0;
        let count: number = 0;
        const len: number = id.length;
        while (i < len) {
            if (count === len) {
                count = 0;
            }
            try {
                if (this.scenario[count].index === id[i]) {
                const storeBefore: object = this.scenario[count];
                const storeAfter: object = await this.scenario[count].call(this.scenario);
                const error = null;
                this.log = {
                    error: {error},
                    index: this.scenario[count].index,
                    meta: this.scenario[count].meta,
                    storeAfter: {storeAfter},
                    storeBefore: {storeBefore},
                };
                this.logs.push(this.log);
                this.log = {};
                i++;
                count = 0;
               } else { count++; }
                }  catch (err) {
                    if (this.scenario[count].index === 1 || this.scenario[count].index === id[len - 1]) {
                        err.message = "Can not restore first or last scenario";
                        throw err;
                    }
                    if (!scenario[count].silent || scenario[count].silent === undefined) {
                        const name = err.name;
                        const message = err.message;
                        const stack = err;
                        const error = {name, message, stack};
                        this.log = {
                        error: {error},
                        index: this.scenario[count].index,
                        meta: this.scenario[count].meta,
                        };
                        this.logs.push(this.log);
                        this.log = {};
                        let i1 = i;
                        while (i1 < len) {
                            try {
                                if (this.scenario[count] !== undefined && this.scenario[count].index === id[i1]) {
                                    if (this.scenario[count].restore) {
                                        const rest = this.scenario[count];
                                        if (!rest) {
                                            throw new Error("rest");
                                        }

                                        if (!rest.restore) {
                                            throw new Error();
                                        }
                                        const restore = await rest.restore(rest);
                                        const storeBefore = this.scenario[count];
                                        const storeAfter = restore;
                                        this.store = {};
                                        this.log = {
                                            error: null,
                                            index: this.scenario[count].index,
                                            meta: this.scenario[count].meta,
                                            storeAfter: {storeAfter},
                                            storeBefore: {storeBefore},
                                        };
                                        this.logs.push({});
                                        this.log = {};
                                        count = 0;
                                    }
                                } else {
                                    count++;
                                  }
                            } catch (err) {
                                throw err;
                            }
                            i1++;
                        }
                    } else if (scenario[count].silent) {
                        try {
                        await scenario[count].call(this.scenario);
                        count++;
                        } catch {
                            const name = err.name;
                            const message = err.message;
                            const error = {name, message, stack: err};
                            this.log = {
                                error: {error},
                                index: this.scenario[count].index,
                                meta: this.scenario[count].meta,
                            };
                            this.logs.push(this.log);
                            this.log = {};
                            count++;
                        }
                    }
                    i++;
                    }
        }
    }

        private getIndex() {
            const indexes: number[] = [];
            for (const item in this.scenario) {
                if (this.scenario[item].index) {
                    indexes.push(this.scenario[item].index);
                }
            }
            indexes.sort();
            return indexes;
        }
}
