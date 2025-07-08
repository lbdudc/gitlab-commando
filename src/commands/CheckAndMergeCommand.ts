import { Command } from "./Command.js";
import { GetMergeRequestCommand } from "./GetMergeRequestCommand.js";
import { MergeMergeRequestCommand } from "./MergeMergeRequestCommand.js";

export class CheckAndMergeCommand extends Command {
    private id: string;
    private mergeRequestIid: string;
    private shouldRemoveSourceBranch: boolean;

    constructor(url: string, token: string, id: string, mergeRequestIid: string, shouldRemoveSourceBranch: boolean = true) {
        super(url, 'PUT', `projects/${id}/merge_requests/${mergeRequestIid}/merge?should_remove_source_branch=${shouldRemoveSourceBranch}`, token);
        this.id = id;
        this.mergeRequestIid = mergeRequestIid;
        this.shouldRemoveSourceBranch = shouldRemoveSourceBranch;
    }

    async execute(): Promise<any> {
        return await new Promise((resolve) => {
            var intervalId = setInterval(async () => {
              const clientErrorResponseStatus = [404, 405, 409, 422];
              const response = await new MergeMergeRequestCommand(
                this.url, 
                this.token ?? '', 
                this.id, 
                this.mergeRequestIid, 
                this.shouldRemoveSourceBranch)
                .execute();

              const mergeStatus = (await new GetMergeRequestCommand(
                this.url, 
                this.token ?? '', 
                this.id, 
                this.mergeRequestIid)
                .execute()).detailed_merge_status;

              if (
                !clientErrorResponseStatus.includes(await response.status) ||
                mergeStatus === "broken_status" || mergeStatus === "conflict"
              ) {
                resolve(mergeStatus !== "not_open");
                clearInterval(intervalId);
              } 
            }, 500);
        });
    }
}
