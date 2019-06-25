import {Transaction} from "./transaction-module";
import {ScenarioInterface} from "./transaction-module/schema";
let  scenario: ScenarioInterface;
scenario = [
    {
        // callback for main execution
        call: async (store: object) => {
            const obj = store;
            return obj;
        },
        index: 1,
        meta: {
            description: "This action is responsible for reading the most popular customers",
            title: "Read popular customers 1",
        },
        restore: async () => {
            return "restored";
        },
        silent: true,
    },
    {
        // callback for main execution
        call: async (store: object) => {
            const obj = store;
            return obj;
        },
        index: 2,
        meta: {
            description: "This action is responsible for reading the most popular customers",
            title: "Read popular customers 1",
        },
        restore: async () => {
            return "restored";
        },
        silent: true,
    },
    {
        // callback for main execution
        call: async (store: object) => {
            const obj = store;
            return obj;
        },
        index: 3,
        meta: {
            description: "This action is responsible for reading the most popular customers",
            title: "Read popular customers 1",
        },
        restore: async () => {
            return "restored";
        },
        silent: true,
    },
    {
        // callback for main execution
        call: async (store: object) => {
            const obj = store;
            return obj;
        },
        index: 4,
        meta: {
            description: "This action is responsible for reading the most popular customers",
            title: "Read popular customers 1",
        },
        restore: async () => {
            return "restored";
        },
        silent: true,
    },
];

const transaction = new Transaction();
(async () => {
    try {
        await transaction.dispatch(scenario);
        const store = transaction.store; // {} | null
        const logs = transaction.logs; // []
        console.log(logs);
    } catch (err) {
        console.log(err);
    }
})();
