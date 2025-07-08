import { Command } from "./Command.js";

export class GetProjectMembersCommand extends Command {
    constructor(url: string, token: string, id: string, perPage: number = 100) {
        super(url, 'GET', `projects/${id}/members/all?per_page=${perPage}`, token);
    }
}

