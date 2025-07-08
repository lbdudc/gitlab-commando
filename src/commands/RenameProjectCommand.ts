import { UndoableCommand } from "./UndoableCommand.js";
import { GetProjectCommand } from "./GetProjectCommand.js"; 

export class RenameProjectCommand extends UndoableCommand {
    private id: string;
    private name: string;
    private previousName?: string;

    constructor(url: string, token: string, id: string, name: string) {
        super(url, 'PUT', `projects/${id}`, token);
        this.id = id;
        this.name = name;
    }

    async execute(): Promise<any> {
        this.previousName = (await new GetProjectCommand(this.url, this.token ?? '', this.id).execute()).name;
        return await super.execute({ name: this.name });
    }

    async undo(): Promise<any> {
        if (this.token && this.previousName) {
            return (await new RenameProjectCommand(this.url, this.token, this.id, this.previousName).execute());
        }
    }
}
