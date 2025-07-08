import { Command } from "./Command.js";

export class GetProjectsCommand extends Command {
  constructor(url: string, token: string, id: string, page?: number) {
    const query = page !== undefined ? `?page=${page.toString()}` : '';
    super(url, 'GET', `projects/${id}${query}`, token);
  }
}

