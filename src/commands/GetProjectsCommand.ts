import { Command } from "./Command.js";

export class GetProjectsCommand extends Command {
  constructor(url: string, token: string, topic: string, page?: number) {
        const query = new URLSearchParams();
        if (topic) query.append("topic", topic);
        if (page) query.append("page", page.toString());
        query.append("per_page", "100");

        super(url, 'GET', `projects?${query.toString()}`, token);
  }
}

