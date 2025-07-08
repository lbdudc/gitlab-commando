import { GitLabError } from "../errors/GitLabError.js";
import { GitLabAuthError } from "../errors/GitLabAuthError.js";

export abstract class Command {
    url: string;
    token?: string;
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

    constructor(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', path: string, token?: string) {
        this.url = url;
        this.path = path;
        this.token = token;
        this.method = method;
    }

    public async execute(body?: Record<string, any>, json: boolean = true): Promise<any> {
        const init: RequestInit = {
            method: this.method,
            headers: new Headers({
                "Authorization": `Bearer ${this.token}`,
                    ...(body !== undefined && { "Content-Type": "application/json" })
                }),
        };
        if (body !== undefined) {
            init.body = JSON.stringify(body);
        }
        const res = await fetch(`${this.url}/api/v4/${this.path}`, init);
        if (!json) {
            return res;
        } else if (res.ok) {
            return await res.json();
        } else {
            const errorResponse = await res.json();
            if((await res.status) === 401){
                throw new GitLabAuthError(errorResponse.error);
            }
            throw new GitLabError(`Error from server: ${errorResponse.error ?? 'Unknown error'}`);
        }
    }
}