import { Command } from "./Command.js";

export class GetFileCommand extends Command {
    constructor(url: string, token: string, id: string, filePath: string, branch: string) {
        super(url, 'GET', `projects/${id}/repository/files/${filePath.replaceAll('/', '%2F')}?ref=${branch}`, token);
    }
}

