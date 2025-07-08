import { UndoableCommand } from "./UndoableCommand.js";
import { GetProjectCommand } from "./GetProjectCommand.js"; 

export class SetDefaultBranchCommand extends UndoableCommand {
    private id: string;
    private branch: string;
    private previousBranch?: string;

    constructor(url: string, token: string, id: string, branch: string) {
        super(url, 'PUT', `projects/${id}`, token);
        this.id = id;
        this.branch = branch;
    }

    async execute(): Promise<any> {
        this.previousBranch = (await new GetProjectCommand(this.url, this.token ?? '', this.id).execute()).name;
        return await super.execute({ default_branch: this.branch });
    }

    async undo(): Promise<any> {
        if (this.token && this.previousBranch) {
            return (await new SetDefaultBranchCommand(this.url, this.token, this.id, this.previousBranch).execute());
        }
    }
}
