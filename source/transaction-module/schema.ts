export interface ScenarioInterface {
    [index: number]: {
        index: number,
        silent: boolean,
        meta: {
            title: string,
            description: string,
        },
        call(store: object): object,
        restore?(store: object): object,
    };
}

export interface LogInterface  {
        error?: null | object;
        index?: number;
        meta?: {
            title: string;
            description: string;
        };
        storeAfter?: object;
        storeBefore?: object;
}
