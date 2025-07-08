import { Command } from './Command.js';

export abstract class UndoableCommand extends Command {
    abstract undo(): Promise<any>;
}
