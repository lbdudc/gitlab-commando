import { Command } from "./Command.js";

export class GetGroupMembersCommand extends Command {
    constructor(url: string, token: string, id: string, perPage: number = 100) {
        super(url, 'GET', `groups/${id}/members/all?per_page=${perPage}`, token);
    }
}

