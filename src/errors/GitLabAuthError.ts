import { GitLabError } from "./GitLabError.js";

export class GitLabAuthError extends GitLabError {
    constructor(message: string) {
      super(message);
    }
  }