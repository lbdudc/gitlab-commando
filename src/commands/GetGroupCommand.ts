import { Command } from "./Command.js";

export class GetGroupCommand extends Command {
    constructor(url: string, token: string, id: string) {
        super(url, 'GET', `groups/${id}`, token);
    }
}

