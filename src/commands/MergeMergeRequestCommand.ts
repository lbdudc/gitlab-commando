import { Command } from "./Command.js";

export class MergeMergeRequestCommand extends Command {
    private json;

    constructor(url: string, token: string, id: string, mergeRequestIid: string, shouldRemoveSourceBranch: boolean = true, json: boolean = false) {
        super(url, 'PUT', `projects/${id}/merge_requests/${mergeRequestIid}/merge?should_remove_source_branch=${shouldRemoveSourceBranch}`, token);
        this.json = json;
    }

    async execute(): Promise<any> {
        return await super.execute(undefined, this.json);
    }
}

