import { UndoableCommand } from "./UndoableCommand.js";
import { DeleteTagCommand } from "./DeleteTagCommand.js";

export class CreateTagCommand extends UndoableCommand {
    private projectId: string;
    private tag: string;
    private ref: string;

    constructor(url: string, token: string, projectId: string, tag: string, ref: string = "main") {
        super(url, 'POST', `projects/${projectId}/repository/tags?tag_name=${tag}&ref=${ref}`, token);
        this.projectId = projectId;
        this.tag = tag;
        this.ref = ref;
    }

    async execute(): Promise<any> {
        return await super.execute({
            tag: this.tag,
            ref: this.ref
        });
    }

    async undo(): Promise<any> {
        if (this.token) {
            return (await new DeleteTagCommand(this.url, this.token, this.projectId, this.tag).execute());
        }
    }
}
