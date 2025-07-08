import { Command } from "./Command.js";

export class DownloadRepositoryCommand extends Command {
    constructor(url: string, token: string, id: string, ref: string = 'main') {
        super(url, 'GET', `projects/${id}/repository/archive.zip?sha=${ref}`, token);
    }

    async execute(): Promise<any> {
        return await super.execute(undefined, false);
    }
}

