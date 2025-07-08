import { Command } from "./Command.js";

export class DeleteGroupCommand extends Command {
    constructor(url: string, token: string, id: string) {
        super(url, 'DELETE', `groups/${id}`, token);
    }
}

