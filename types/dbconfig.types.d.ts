export interface DbConfigTypes {
    user: string | undefined;
    password: string | undefined;
    server: string | undefined;
    database: string | undefined;
    port: number;
    options: {
        encrypt: boolean;
        trustServerCertificate: boolean;
    };
}