import { Command } from "./Command.js";

export class GetProjectCommand extends Command {
    constructor(url: string, token: string, id: string) {
        super(url, 'GET', `projects/${id}`, token);
    }
}

