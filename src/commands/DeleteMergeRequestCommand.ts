import { Command } from "./Command.js";
import { GetMergeRequestCommand } from "./GetMergeRequestCommand.js"; 
import { CreateMergeRequestCommand } from "./CreateMergeRequestCommand.js"; 

export class DeleteMergeRequestCommand extends Command {
    private id: string;
    private mergeRequestIid: string;
    private sourceBranch?: string;
    private targetBranch?: string;
    private previousTitle?: string;

    constructor(url: string, token: string, id: string, mergeRequestIid: string) {
        super(url, 'DELETE', `projects/${id}/merge_requests/${mergeRequestIid}`, token);
        this.id = id;
        this.mergeRequestIid = mergeRequestIid;
    }

    async execute(): Promise<any> {
        const response = (await new GetMergeRequestCommand(this.url, this.token ?? '', this.id, this.mergeRequestIid).execute());
        this.sourceBranch = response.source_branch;
        this.targetBranch = response.target_branch;
        this.previousTitle = response.title;
        return await super.execute();
    }

    async undo(): Promise<any> {
        if (this.token && this.previousTitle && this.sourceBranch && this.targetBranch) {
            return (await new CreateMergeRequestCommand(this.url, this.token, this.previousTitle, this.sourceBranch, this.targetBranch).execute());
        }
    }
}

