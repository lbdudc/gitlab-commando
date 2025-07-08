import { UndoableCommand } from "./UndoableCommand.js";
import { DeleteGroupCommand } from "./DeleteGroupCommand.js";

export class CreateGroupCommand extends UndoableCommand {
    private name : string;
    private namespaceId: string;
    private id?: string;

    constructor(url: string, token: string, name: string, namespaceId: string) {
        super(url, 'POST', 'groups', token);
        this.name = name;
        this.namespaceId = namespaceId;
    }

    async execute(): Promise<any> {
        const response = await super.execute({
            name: this.name, 
            path: this.name,
            parent_id: this.namespaceId
        });
        this.id = response.id;
        return response;
    }

    async undo(): Promise<any> {
        if(this.token && this.id)
            return (await new DeleteGroupCommand(this.url, this.token, this.id).execute());
    }
    
}

