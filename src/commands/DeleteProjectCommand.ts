import { Command } from "./Command.js";

export class DeleteProjectCommand extends Command {
    constructor(url: string, token: string, id: string) {
        super(url, 'DELETE', `projects/${id}`, token);
    }
}