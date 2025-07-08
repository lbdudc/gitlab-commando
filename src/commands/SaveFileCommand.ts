import { GetFileCommand } from "./GetFileCommand.js";
import { RevertCommitCommand } from "./RevertCommitCommand.js";
import { UndoableCommand } from "./UndoableCommand.js";

export class SaveFileCommand extends UndoableCommand {
    private id: string;
    private filePath: string;
    private branch: string;
    private content: string;

    constructor(url: string, token: string, id: string, filePath: string, branch: string, content: string) {
        super(url, 'PUT', `projects/${id}/repository/files/${filePath.replaceAll('/', '%2F')}`, token);
        this.id = id;
        this.filePath = filePath;
        this.branch = branch;
        this.content = content;
    }

    async execute(): Promise<any> {
        return await super.execute({
            branch: this.branch, 
            content: this.content, 
            commit_message: `Updated ${this.filePath}`
        });
    }

    async undo(): Promise<any> {
        if (this.token) {
            const response = (await new GetFileCommand(this.url, this.token, this.id, this.filePath, this.branch).execute());
            if(response.last_commit_id){
                return (await new RevertCommitCommand(this.url, this.token, this.id, response.last_commit_id, this.branch).execute());
            }
        }
    }
}