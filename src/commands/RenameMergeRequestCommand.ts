import { UndoableCommand } from "./UndoableCommand.js";
import { GetMergeRequestCommand } from "./GetMergeRequestCommand.js"; 

export class RenameMergeRequestCommand extends UndoableCommand {
    private id: string;
    private mergeRequestIid: string;
    private previousTitle?: string;

    constructor(url: string, token: string, id: string, mergeRequestIid: string, title: string) {
        super(url, 'PUT', `projects/${id}/merge_requests/${mergeRequestIid}?title=${title}`, token);
        this.id = id;
        this.mergeRequestIid = mergeRequestIid;
    }

    async execute(): Promise<any> {
        this.previousTitle = (await new GetMergeRequestCommand(this.url, this.token ?? '', this.id, this.mergeRequestIid).execute()).title;
        return await super.execute();
    }

    async undo(): Promise<any> {
        if (this.token && this.previousTitle) {
            return (await new RenameMergeRequestCommand(this.url, this.token, this.id, this.mergeRequestIid, this.previousTitle).execute());
        }
    }
}
