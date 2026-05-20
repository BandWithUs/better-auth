import type { ResourceServerMetadata } from "@better-auth/oauth-provider";
import type { verifyAccessToken } from "better-auth/oauth2";
import type { JWTPayload } from "jose";
type VerifyOptions = Parameters<typeof verifyAccessToken>[1];
type Awaitable<T> = T | Promise<T>;
type WithMcpAuthOptions = {
    resourceMetadataMappings?: Record<string, string>;
};
export declare const withMcpAuth: (verifyOptions: VerifyOptions, handler: (req: Request, jwt: JWTPayload) => Awaitable<Response>, opts?: WithMcpAuthOptions) => (req: Request) => Promise<Response>;
export declare const oAuthDiscoveryMetadata: <Auth extends {
    api: {
        getOAuthServerConfig: (...args: any) => any;
    };
}>(auth: Auth, opts?: {
    headers?: HeadersInit;
}) => (request: Request) => Promise<Response>;
export declare const oAuthProtectedResourceMetadata: (opts: {
    resource: string;
    authorizationServers: string[];
    scopesSupported?: string[];
    bearerMethodsSupported?: Array<"header" | "body">;
    extraMetadata?: Partial<ResourceServerMetadata>;
}) => () => Promise<Response>;
export {};
//# sourceMappingURL=index.d.ts.map