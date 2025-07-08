import { UndoableCommand } from "./UndoableCommand.js";
import { DeleteProjectCommand } from "./DeleteProjectCommand.js";

export class CreateProjectCommand extends UndoableCommand {
    private name: string;
    private namespaceId: string;
    private topics: string[];
    private branch: string;
    private id?: string;

    constructor(url: string, token: string, name: string, namespaceId: string, topics: string[] = [], branch: string = "main") {
        super(url, 'POST', 'projects', token);
        this.name = name;
        this.namespaceId = namespaceId;
        this.topics = topics;
        this.branch = branch;
    }

    async execute(): Promise<any> {
        const response = await super.execute({
            name: this.name,
            namespace_id: this.namespaceId,
            initialize_with_readme: true,
            topics: this.topics,
            default_branch: this.branch
        });
        this.id = response.id;
        return response;
    }

    async undo(): Promise<any> {
        if (this.token && this.id) {
            return (await new DeleteProjectCommand(this.url, this.token, this.id).execute());
        }
    }
}
