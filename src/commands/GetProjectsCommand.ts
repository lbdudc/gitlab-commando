import { Command } from "./Command.js";

export class GetProjectsCommand extends Command {
    constructor(url: string, token: string, topics: string) {
        super(url, 'GET', `projects?topics=${topics}`, token);
    }
}

