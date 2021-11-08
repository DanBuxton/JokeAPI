/** Normalized deployment environment name */
export type Env = "prod" | "stage";

/** Environment-dependent global property */
export type EnvDependentProp = "name" | "httpPort" | "baseUrl" | "debug";

export interface CommitInfo {
    shortHash: string;
    hash: string;
    subject: string;
    sanitizedSubject: string;
    body: string;
    authoredOn: string;
    committedOn: string;
    author: {
        name: string;
        email: string;
    }
    committer: {
        name: string;
        email: string;
    }
    notes: string;
    branch: string;
    tags: string[];
}

/** Environment dependent settings */
export interface EnvSettings {
    [key: string]: string | number | boolean;

    name: string;
    httpPort: number;
    baseUrl: string;
    debug: boolean;
}
