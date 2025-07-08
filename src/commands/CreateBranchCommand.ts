import { UndoableCommand } from "./UndoableCommand.js";
import { DeleteBranchCommand } from "./DeleteBranchCommand.js"; 

export class CreateBranchCommand extends UndoableCommand {
    private projectId: string;
    private branchName: string;
    private ref: string;

    constructor(url: string, token: string, projectId: string, branchName: string, ref: string = "main") {
        super(url, 'POST', `projects/${projectId}/repository/branches`, token);
        this.projectId = projectId;
        this.branchName = branchName;
        this.ref = ref;
    }

    async execute(): Promise<any> {
        return await super.execute({
            branch: this.branchName,
            ref: this.ref
        });
    }

    async undo(): Promise<any> {
        if (this.token && this.projectId) {
            return (await new DeleteBranchCommand(this.url, this.token, this.projectId, this.branchName).execute());
        }
    }
}
