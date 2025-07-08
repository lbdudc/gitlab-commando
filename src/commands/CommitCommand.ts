import { UndoableCommand } from "./UndoableCommand.js";
import { RevertCommitCommand } from "./RevertCommitCommand.js";

export class CommitCommand extends UndoableCommand {
    private projectId: string;
    private actions: [];
    private message: string;
    private branch: string;
    private sha?: string;

    constructor(url: string, token: string, projectId: string, actions: [], message: string, branch: string = 'branch') {
        super(url, 'POST', `projects/${projectId}/repository/commits`, token);
        this.projectId = projectId;
        this.actions = actions;
        this.message = message;
        this.branch = branch;
    }

    async execute(): Promise<any> {
        const response = await super.execute({
            branch: this.branch,
            commit_message: this.message,
            actions: this.actions
        });
        this.sha = response.id;
        return response;
    }

    async undo(): Promise<any> {
        if (this.token && this.sha) {
            return (await new RevertCommitCommand(this.url, this.token, this.projectId, this.sha, this.branch).execute());
        }
    }
}