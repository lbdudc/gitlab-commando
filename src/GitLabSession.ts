import { Stack } from 'stack-typescript'; 
import { Command } from './commands/Command.js';
import { UndoableCommand } from './commands/UndoableCommand.js';
import { CommandSession } from './CommandSession.js';
import { GitLabClient } from './GitLabClient.js';
import { CloseMergeRequestCommand } from './commands/CloseMergeRequestCommand.js';
import { CommitCommand } from './commands/CommitCommand.js';
import { CreateBranchCommand } from './commands/CreateBranchCommand.js';
import { CreateFileCommand } from './commands/CreateFileCommand.js';
import { CreateGroupCommand } from './commands/CreateGroupCommand.js';
import { CreateMergeRequestCommand } from './commands/CreateMergeRequestCommand.js';
import { CreateOrRenameMergeRequestCommand } from './commands/CreateOrRenameMergeRequestCommand.js';
import { CreateProjectCommand } from './commands/CreateProjectCommand.js';
import { CreateTagCommand } from './commands/CreateTagCommand.js';
import { DeleteBranchCommand } from './commands/DeleteBranchCommand.js';
import { DeleteGroupCommand } from './commands/DeleteGroupCommand.js';
import { DeleteMergeRequestCommand } from './commands/DeleteMergeRequestCommand.js';
import { DeleteProjectCommand } from './commands/DeleteProjectCommand.js';
import { DeleteTagCommand } from './commands/DeleteTagCommand.js';
import { DownloadRepositoryCommand } from './commands/DownloadRepositoryCommand.js';
import { GetFileCommand } from './commands/GetFileCommand.js';
import { GetGroupCommand } from './commands/GetGroupCommand.js';
import { GetMergeRequestCommand } from './commands/GetMergeRequestCommand.js';
import { GetMergeRequestsByBranchesCommand } from './commands/GetMergeRequestsByBranchesCommand.js';
import { GetProjectCommand } from './commands/GetProjectCommand.js';
import { GetProjectMembersCommand } from './commands/GetProjectMembersCommand.js';
import { GetProjectsCommand } from './commands/GetProjectsCommand.js';
import { GetUserDataCommand } from './commands/GetUserDataCommand.js';
import { MergeMergeRequestCommand } from './commands/MergeMergeRequestCommand.js';
import { RefreshAccessTokenCommand } from './commands/RefreshAccessTokenCommand.js';
import { RenameGroupCommand } from './commands/RenameGroupCommand.js';
import { RenameMergeRequestCommand } from './commands/RenameMergeRequestCommand.js';
import { RenameProjectCommand } from './commands/RenameProjectCommand.js';
import { ReopenMergeRequestCommand } from './commands/ReopenMergeRequestCommand.js';
import { RequestAccessTokenCommand } from './commands/RequestAccessTokenCommand.js';
import { RevertCommitCommand } from './commands/RevertCommitCommand.js';
import { SaveFileCommand } from './commands/SaveFileCommand.js';
import { SetDefaultBranchCommand } from './commands/SetDefaultBranchCommand.js';
import { CheckAndMergeCommand } from './commands/CheckAndMergeCommand.js';
import { GetGroupMembersCommand } from './commands/GetGroupMembersCommand.js';


export class GitLabSession implements CommandSession, GitLabClient {
    private url : string;
    private commandStack = new Stack<UndoableCommand>();

    constructor(url: string) {
        this.url = url;
    }

    public async executeCommand(cmd: Command): Promise<any> {
        const execution = await cmd.execute();
        if (cmd instanceof UndoableCommand) {
            this.commandStack.push(cmd as UndoableCommand);
        }
        return execution;
    }

    public async undo(): Promise<any> {
        if (this.commandStack.size > 0) {
            const cmd = this.commandStack.pop();
            return await cmd.undo();
        } else {
            return;
        }
    }

    public async rollback(): Promise<any> {
        for (let i = 0; i < this.commandStack.size; i++) {
            const cmd = this.commandStack.pop();
            await cmd.undo();
        }
    }

    public async checkAndMerge(token: string, id: string, mergeRequestIid: string, shouldRemoveSourceBranch: boolean): Promise<any> {
        return await this.executeCommand(new CheckAndMergeCommand(this.url, token, id, mergeRequestIid, shouldRemoveSourceBranch));
    }

    public async closeMergeRequest(token: string, id: string, mergeRequestIid: string): Promise<any> {
        return await this.executeCommand(new CloseMergeRequestCommand(this.url, token, id, mergeRequestIid));
    }

    public async commit(token: string, projectId: string, actions: [], message: string, branch: string): Promise<any> {
        return await this.executeCommand(new CommitCommand(this.url, token, projectId, actions, message, branch));
    }
    
    public async createBranch(token: string, projectId: string, branchName: string, ref: string): Promise<any> {
        return await this.executeCommand(new CreateBranchCommand(this.url, token, projectId, branchName, ref));
    }
    
    public async createFile(token: string, id: string, filePath: string, branch: string, content: string): Promise<any> {
        return await this.executeCommand(new CreateFileCommand(this.url, token, id, filePath, branch, content));
    }
    
    public async createGroup(token: string, name: string, namespaceId: string): Promise<any> {
        return await this.executeCommand(new CreateGroupCommand(this.url, token, name, namespaceId));
    }
    
    public async createMergeRequest(token: string, id: string, title: string, sourceBranch: string, targetBranch: string): Promise<any> {
        return await this.executeCommand(new CreateMergeRequestCommand(this.url, token, id, title, sourceBranch, targetBranch));
    }

    public async createOrRenameMergeRequest(token: string, id: string, title: string, sourceBranch: string, targetBranch: string): Promise<any> {
        return await this.executeCommand(new CreateOrRenameMergeRequestCommand(this.url, token, id, title, sourceBranch, targetBranch));
    }
    
    public async createProject(token: string, name: string, namespaceId: string, topics: string[], branch: string): Promise<any> {
        return await this.executeCommand(new CreateProjectCommand(this.url, token, name, namespaceId, topics, branch));
    }
    
    public async createTag(token: string, projectId: string, tag: string, ref: string): Promise<any> {
        return await this.executeCommand(new CreateTagCommand(this.url, token, projectId, tag, ref));
    }
    
    public async deleteBranch(token: string, projectId: string, branchName: string): Promise<any> {
        return await this.executeCommand(new DeleteBranchCommand(this.url, token, projectId, branchName));
    }

    public async deleteGroup(token: string, id: string): Promise<any> {
        return await this.executeCommand(new DeleteGroupCommand(this.url, token, id));
    }
    
    public async deleteMergeRequest(token: string, id: string, mergeRequestIid: string): Promise<any> {
        return await this.executeCommand(new DeleteMergeRequestCommand(this.url, token, id, mergeRequestIid));
    }
    
    public async deleteProject(token: string, id: string): Promise<any> {
        return await this.executeCommand(new DeleteProjectCommand(this.url, token, id));
    }
    
    public async deleteTag(token: string, projectId: string, tag: string): Promise<any> {
        return await this.executeCommand(new DeleteTagCommand(this.url, token, projectId, tag));
    }
    
    public async downloadRepository(token: string, id: string, ref: string): Promise<any> {
        return await this.executeCommand(new DownloadRepositoryCommand(this.url, token, id, ref));
    }
    
    public async getFile(token: string, id: string, filePath: string, branch: string): Promise<any> {
        return await this.executeCommand(new GetFileCommand(this.url, token, id, filePath, branch));
    }
    
    public async getGroup(token: string, id: string): Promise<any> {
        return await this.executeCommand(new GetGroupCommand(this.url, token, id));
    }

    public async getGroupMembers(token: string, id: string, perPage: number = 100): Promise<any> {
        return await this.executeCommand(new GetGroupMembersCommand(this.url, token, id, perPage));
    }
    
    
    public async getMergeRequest(token: string, id: string, mergeRequestIid: string): Promise<any> {
        return await this.executeCommand(new GetMergeRequestCommand(this.url, token, id, mergeRequestIid));
    }
    
    public async getMergeRequestsByBranches(token: string, id: string, sourceBranch: string, targetBranch: string, state: string): Promise<any> {
        return await this.executeCommand(new GetMergeRequestsByBranchesCommand(this.url, token, id, sourceBranch, targetBranch, state));
    }
    
    public async getProject(token: string, id: string): Promise<any> {
        return await this.executeCommand(new GetProjectCommand(this.url, token, id));
    }
    
    public async getProjectMembers(token: string, id: string, perPage: number = 100): Promise<any> {
        return await this.executeCommand(new GetProjectMembersCommand(this.url, token, id, perPage));
    }
    
    public async getProjects(token: string, topic: string, page?: number): Promise<any> {
        return await this.executeCommand(new GetProjectsCommand(this.url, token, topic, page));
    }

    public async getUserData(token: string): Promise<any> {
        return await this.executeCommand(new GetUserDataCommand(this.url, token));
    }
    
    public async mergeMergeRequest(token: string, id: string, mergeRequestIid: string, shouldRemoveSourceBranch: boolean, json: boolean): Promise<any> {
        return await this.executeCommand(new MergeMergeRequestCommand(this.url, token, id, mergeRequestIid, shouldRemoveSourceBranch, json));
    }
    
    public async refreshAccessToken(refreshToken: string, clientId: string, clientSecret: string, redirectUri: string): Promise<any> {
        return await this.executeCommand(new RefreshAccessTokenCommand(this.url, refreshToken, clientId, clientSecret, redirectUri));
    }
    
    public async renameGroup(token: string, id: string, name: string): Promise<any> {
        return await this.executeCommand(new RenameGroupCommand(this.url, token, id, name));
    }
    
    public async renameMergeRequest(token: string, id: string, mergeRequestIid: string, title: string): Promise<any> {
        return await this.executeCommand(new RenameMergeRequestCommand(this.url, token, id, mergeRequestIid, title));
    }
    
    public async renameProject(token: string, id: string, name: string): Promise<any> {
        return await this.executeCommand(new RenameProjectCommand(this.url, token, id, name));
    }
    
    public async reopenMergeRequest(token: string, id: string, mergeRequestIid: string): Promise<any> {
        return await this.executeCommand(new ReopenMergeRequestCommand(this.url, token, id, mergeRequestIid));
    }
    
    public async requestAccessToken(code: string, clientId: string, clientSecret: string, redirectUri: string): Promise<any> {
        return await this.executeCommand(new RequestAccessTokenCommand(this.url, code, clientId, clientSecret, redirectUri));
    }
    
    public async revertCommit(token: string, projectId: string, sha: string, branch: string): Promise<any> {
        return await this.executeCommand(new RevertCommitCommand(this.url, token, projectId, sha, branch));
    }
    
    public async saveFile(token: string, id: string, filePath: string, branch: string, content: string): Promise<any> {
        return await this.executeCommand(new SaveFileCommand(this.url, token, id, filePath, branch, content));
    }
    
    public async setDefaultBranch(token: string, id: string, branch: string): Promise<any> {
        return await this.executeCommand(new SetDefaultBranchCommand(this.url, token, id, branch));
    }
}