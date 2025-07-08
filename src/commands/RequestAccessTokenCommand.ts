import { GitLabAuthError } from "../errors/GitLabAuthError.js";
import { Command } from "./Command.js";

export class RequestAccessTokenCommand extends Command {

    private code: string;
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;

    constructor(url: string, code: string, clientId: string, clientSecret: string, redirectUri: string) {
        super(url, 'POST', `oauth/token`);
        this.code = code;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
    }

    async execute(): Promise<any> {
        const init = {
            method: this.method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              grant_type: 'authorization_code',
              client_id: this.clientId,
              client_secret: this.clientSecret,
              code: this.code,
              redirect_uri: this.redirectUri
            }),
        };
        const res = await fetch(`${this.url}/${this.path}`, init);
        const json = await res.json();
        if (res.ok) {
            return json;
        } else {
            throw new GitLabAuthError(json);
        }
    }
}

