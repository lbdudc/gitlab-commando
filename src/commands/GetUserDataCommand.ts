import { Command } from "./Command.js";

export class GetUserDataCommand extends Command {
    constructor(url: string, token: string) {
        super(url, 'GET', 'user', token);
    }
}

