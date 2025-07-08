import { Command } from "./Command.js";

export class RevertCommitCommand extends Command {
    private branch: string;

    constructor(url: string, token: string, projectId: string, sha: string, branch: string) {
        super(url, 'POST', `projects/${projectId}/repository/commits/${sha}/revert`, token);
        this.branch = branch;
    }

    async execute(): Promise<any> {
        const dryRun = await super.execute({
            branch: this.branch,
            dry_run: true
        });

        if(dryRun.dry_run && dryRun.dry_run === 'success') {
            return await super.execute({
                branch: this.branch
            });
        } 
        
        return dryRun;
    }
}
