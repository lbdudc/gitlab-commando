import { GitLabAuthError } from "../errors/GitLabAuthError.js";
import { Command } from "./Command.js";

export class RefreshAccessTokenCommand extends Command {

    private refreshToken: string;
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;

    constructor(url: string, refreshToken: string, clientId: string, clientSecret: string, redirectUri: string) {
        super(url, 'POST', `oauth/token`);
        this.refreshToken = refreshToken;
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
              grant_type: 'refresh_token',
              client_id: this.clientId,
              client_secret: this.clientSecret,
              refresh_token: this.refreshToken,
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

