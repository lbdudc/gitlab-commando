import { UndoableCommand } from "./UndoableCommand.js";
import { CloseMergeRequestCommand } from "./CloseMergeRequestCommand.js"; 

export class ReopenMergeRequestCommand extends UndoableCommand {
    private id: string;
    private mergeRequestIid: string;

    constructor(url: string, token: string, id: string, mergeRequestIid: string) {
        super(url, 'PUT', `projects/${id}/merge_requests/${mergeRequestIid}?state_event=reopen`, token);
        this.id = id;
        this.mergeRequestIid = mergeRequestIid;
    }

    async undo(): Promise<any> {
        if (this.token) {
            return (await new CloseMergeRequestCommand(this.url, this.token, this.id, this.mergeRequestIid).execute());
        }
    }
}
