import { Command } from "./Command.js";
import { CreateMergeRequestCommand } from "./CreateMergeRequestCommand.js";
import { GetMergeRequestsByBranchesCommand } from "./GetMergeRequestsByBranchesCommand.js";
import { RenameMergeRequestCommand } from "./RenameMergeRequestCommand.js";


export class CreateOrRenameMergeRequestCommand extends Command {
    private title : string;
    private id: string;
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
        let mergeRequest;
        try {
            mergeRequest = await new CreateMergeRequestCommand(this.url, this.token ?? '', this.id, this.title, this.sourceBranch, this.targetBranch).execute();
        } catch (error) {
            mergeRequest = (await new GetMergeRequestsByBranchesCommand(this.url, this.token ?? '', this.id, this.sourceBranch, this.targetBranch).execute())[0];
            await new RenameMergeRequestCommand(this.url, this.token ?? '', this.id, mergeRequest.iid, this.title).execute();
        }
        return mergeRequest;
    }
    
}