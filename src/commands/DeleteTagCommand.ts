import { Command } from "./Command.js";

export class DeleteTagCommand extends Command {
    constructor(url: string, token: string, projectId: string, tag: string) {
        super(url, 'DELETE', `projects/${projectId}/repository/tags/${tag}`, token);
    }
}