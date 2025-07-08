import { Command } from "./Command.js";

export class GetMergeRequestCommand extends Command {
    constructor(url: string, token: string, id: string, mergeRequestIid: string) {
        super(url, 'GET', `projects/${id}/merge_requests/${mergeRequestIid}`, token);
    }
}

