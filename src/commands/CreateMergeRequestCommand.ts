import { UndoableCommand } from "./UndoableCommand.js";
import { DeleteMergeRequestCommand } from "./DeleteMergeRequestCommand.js";
import { CloseMergeRequestCommand } from "./CloseMergeRequestCommand.js";


export class CreateMergeRequestCommand extends UndoableCommand {
    private title : string;
    private id: string;
    private mergeRequestIid?: string;
    private sourceBranch: string;
    private targetBranch: string;

    constructor(url: string, token: string, id: string, title: string, sourceBranch: string, targetBranch: string = 'main') {
        super(url, 'POST', `projects/${id}/merge_requests`, token);
        this.id = id;
        this.title = title;
        this.sourceBranch = sourceBranch;
        this.targetBranch = targetBranch;
    }

    async execute(): Promise<any> {
        const response = await super.execute({
            id: this.id,
            title: this.title,
            source_branch: this.sourceBranch,
            target_branch: this.targetBranch,
        });
        this.mergeRequestIid = response.iid;
        return response;
    }

    async undo(): Promise<any> {
        if(this.token && this.id && this.mergeRequestIid){
            try {
                return (await new DeleteMergeRequestCommand(this.url, this.token, this.id, this.mergeRequestIid).execute());
            } catch (error) {
                return (await new CloseMergeRequestCommand(this.url, this.token, this.id, this.mergeRequestIid).execute());
            }
        }
    }
    
}