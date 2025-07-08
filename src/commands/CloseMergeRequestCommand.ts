import { UndoableCommand } from "./UndoableCommand.js";
import { ReopenMergeRequestCommand } from "./ReopenMergeRequestCommand.js"; 

export class CloseMergeRequestCommand extends UndoableCommand {
    private id: string;
    private mergeRequestIid: string;

    constructor(url: string, token: string, id: string, mergeRequestIid: string) {
        super(url, 'PUT', `projects/${id}/merge_requests/${mergeRequestIid}?state_event=close`, token);
        this.id = id;
        this.mergeRequestIid = mergeRequestIid;
    }

    async undo(): Promise<any> {
        if (this.token) {
            return (await new ReopenMergeRequestCommand(this.url, this.token, this.id, this.mergeRequestIid).execute());
        }
    }
}
