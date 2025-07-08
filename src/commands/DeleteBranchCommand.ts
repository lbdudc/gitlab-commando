import { Command } from "./Command.js";

export class DeleteBranchCommand extends Command {
    constructor(url: string, token: string, projectId: string, branchName: string) {
        super(url, 'DELETE', `projects/${projectId}/repository/branches/${branchName}`, token);
    }
}