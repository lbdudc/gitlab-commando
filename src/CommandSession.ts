import { Command } from './commands/Command.js';

export interface CommandSession {
    executeCommand(cmd: Command): Promise<any>;

    undo(): Promise<any>;

    rollback(): Promise<any>;
}