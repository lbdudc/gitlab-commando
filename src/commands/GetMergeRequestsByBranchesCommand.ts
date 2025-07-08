import { Command } from "./Command.js";

export class GetMergeRequestsByBranchesCommand extends Command {
    constructor(url: string, token: string, id: string, sourceBranch: string, targetBranch: string = 'main', state: string = 'opened') {
        super(url, 'GET', `projects/${id}/merge_requests?source_branch=${sourceBranch}&target_branch=${targetBranch}&state=${state}`, token);
    }
}

