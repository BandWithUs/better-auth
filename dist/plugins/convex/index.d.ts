import type { BetterAuthPlugin, Session, User } from "better-auth";
import type { BetterAuthOptions } from "better-auth/minimal";
import type { OAuthOptions, Scope } from "@better-auth/oauth-provider";
import type { AuthConfig } from "convex/server";
export declare const JWT_COOKIE_NAME = "convex_jwt";
type ConvexOAuthProviderOptions = Partial<Omit<OAuthOptions<Scope[]>, "disableJwtPlugin" | "schema">>;
export declare const convex: (opts: {
    /**
     * @param {AuthConfig} authConfig - Auth config from your Convex project.
     *
     * Typically found in `convex/auth.config.ts`.
     *
     * @example
     * ```ts
     * // convex/auth.config.ts
     * export default {
     *   providers: [getAuthConfigProvider({ jwks: process.env.JWKS })],
     * } satisfies AuthConfig;
     * ```
     *
     * @example
     * ```ts
     * // convex/auth.ts
     * import authConfig from './auth.config';
     * export const createAuth = (ctx: GenericCtx<DataModel>) => {
     *   return betterAuth({
     *     // ...
     *     plugins: [convex({ authConfig })],
     *   });
     * };
     * ```
     */
    authConfig: AuthConfig;
    /**
     * @param {Object} jwt - JWT options.
     * @param {number} jwt.expirationSeconds - JWT expiration seconds.
     * @param {Function} jwt.definePayload - Function to define the JWT payload. `sessionId` and `iat` are added automatically.
     */
    jwt?: {
        expirationSeconds?: number;
        definePayload?: (session: {
            user: User & Record<string, any>;
            session: Session & Record<string, any>;
        }) => Promise<Record<string, any>> | Record<string, any> | undefined;
    };
    /**
     * @deprecated Use jwt.expirationSeconds instead.
     */
    jwtExpirationSeconds?: number;
    /**
     * @param {string} jwks - Optional static JWKS to avoid fetching from the database.
     *
     * This should be a stringified document from the Better Auth JWKS table. You
     * can create one in the console.
     *
     * @example
     * ```ts
     * // convex/auth.ts
     * export const rotateKeys = internalAction({
     *   args: {},
     *   handler: async (ctx) => {
     *     const auth = createAuth(ctx)
     *     return await auth.api.rotateKeys()
     *   },
     * })
     * ```
     * Run the action and set the JWKS environment variable
     *
     * ```bash
     * npx convex run auth:rotateKeys | npx convex env set JWKS
     * ```
     * Then use it in your auth config and Better Auth options:
     *
     * ```ts
     * // convex/auth.config.ts
     * export default {
     *   providers: [getAuthConfigProvider({ jwks: process.env.JWKS })],
     * } satisfies AuthConfig;
     *
     * // convex/auth.ts
     * export const createAuth = (ctx: GenericCtx<DataModel>) => {
     *   return betterAuth({
     *     // ...
     *     plugins: [convex({ authConfig, jwks: process.env.JWKS })],
     *   });
     * };
     * ```
     */
    jwks?: string;
    /**
     * @param {boolean} jwksRotateOnTokenGenerationError - Whether to rotate the JWKS on token generation error.
     *
     * Does nothing if a static JWKS is provided.
     *
     * Handles error that occurs when existing JWKS key does not match configured
     * algorithm, which will be common for 0.10 upgrades switching from EdDSA to RS256.
     *
     * @default false
     */
    jwksRotateOnTokenGenerationError?: boolean;
    /**
     * @param {BetterAuthOptions} options - Better Auth options. Not required,
     * currently used to pass the basePath to the oauthProvider plugin.
     */
    options?: BetterAuthOptions;
    /**
     * OAuth 2.1 / OIDC authorization server configuration.
     *
     * The Convex plugin provides the required jwt plugin integration
     * internally, so do not set disableJwtPlugin here.
     */
    oauthProvider?: ConvexOAuthProviderOptions;
}) => {
    id: "convex";
    version: string;
    options: Record<string, any>;
    init: (ctx: import("better-auth").AuthContext) => Promise<{
        context: {
            getPlugin: <ID extends import("better-auth").BetterAuthPluginRegistryIdentifier | import("better-auth").LiteralString, PluginOptions extends never>(pluginId: ID) => (ID extends keyof import("better-auth").BetterAuthPluginRegistry<unknown, unknown> ? import("better-auth").BetterAuthPluginRegistry<BetterAuthOptions, PluginOptions>[ID] extends {
                creator: infer C;
            } ? C extends (...args: any[]) => infer R ? R : never : never : BetterAuthPlugin) | null;
        };
    }>;
    hooks: {
        before: {
            matcher: (context: import("better-auth").HookEndpointContext) => boolean;
            handler: import("better-auth/api").AuthMiddleware;
        }[];
        after: {
            matcher: (context: import("better-auth").HookEndpointContext) => boolean;
            handler: import("better-auth/api").AuthMiddleware;
        }[];
    };
    endpoints: {
        oauthProviderGetOpenIdConfig: import("better-call").StrictEndpoint<"/.well-known/openid-configuration", {
            method: "GET";
            metadata: {
                isAction: false;
            };
        }, Omit<import("@better-auth/oauth-provider").OIDCMetadata, "id_token_signing_alg_values_supported"> & {
            id_token_signing_alg_values_supported: import("better-auth/plugins").JWSAlgorithms[] | ["HS256"];
        }>;
        oauthProviderGetOAuthServerConfig: import("better-call").StrictEndpoint<"/.well-known/oauth-authorization-server", {
            method: "GET";
            metadata: {
                isAction: false;
            };
        }, import("@better-auth/oauth-provider").AuthServerMetadata>;
        getOpenIdConfig: import("better-call").StrictEndpoint<"/convex/.well-known/openid-configuration", {
            method: "GET";
            metadata: {
                isAction: false;
            };
        }, Omit<import("@better-auth/oauth-provider").OIDCMetadata, "id_token_signing_alg_values_supported"> & {
            id_token_signing_alg_values_supported: import("better-auth/plugins").JWSAlgorithms[] | ["HS256"];
        }>;
        getOAuthServerConfig: import("better-call").StrictEndpoint<"/convex/.well-known/oauth-authorization-server", {
            method: "GET";
            metadata: {
                isAction: false;
            };
        }, import("@better-auth/oauth-provider").AuthServerMetadata>;
        getRootJwks: import("better-call").StrictEndpoint<"/jwks", {
            method: "GET";
            metadata: {
                openapi: {
                    description: string;
                };
            };
        }, import("jose").JSONWebKeySet>;
        getJwks: import("better-call").StrictEndpoint<"/convex/jwks", {
            method: "GET";
            metadata: {
                openapi: {
                    description: string;
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            keys: {
                                                type: string;
                                                description: string;
                                                items: {
                                                    type: string;
                                                    properties: {
                                                        kid: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        kty: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        alg: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        use: {
                                                            type: string;
                                                            description: string;
                                                            enum: string[];
                                                            nullable: boolean;
                                                        };
                                                        n: {
                                                            type: string;
                                                            description: string;
                                                            nullable: boolean;
                                                        };
                                                        e: {
                                                            type: string;
                                                            description: string;
                                                            nullable: boolean;
                                                        };
                                                        crv: {
                                                            type: string;
                                                            description: string;
                                                            nullable: boolean;
                                                        };
                                                        x: {
                                                            type: string;
                                                            description: string;
                                                            nullable: boolean;
                                                        };
                                                        y: {
                                                            type: string;
                                                            description: string;
                                                            nullable: boolean;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }, import("jose").JSONWebKeySet>;
        getLatestJwks: import("better-call").StrictEndpoint<"/convex/latest-jwks", {
            isAction: boolean;
            method: "POST";
            metadata: {
                SERVER_ONLY: true;
                openapi: {
                    description: string;
                };
            };
        }, any[]>;
        rotateKeys: import("better-call").StrictEndpoint<"/convex/rotate-keys", {
            isAction: boolean;
            method: "POST";
            metadata: {
                SERVER_ONLY: true;
                openapi: {
                    description: string;
                };
            };
        }, any[]>;
        getToken: import("better-call").StrictEndpoint<"/convex/token", {
            method: "GET";
            requireHeaders: true;
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            metadata: {
                openapi: {
                    description: string;
                    responses: {
                        200: {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            token: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }, {
            token: string;
        }>;
        oauth2Authorize: import("better-call").StrictEndpoint<"/oauth2/authorize", {
            method: "GET";
            query: import("zod").ZodObject<{
                response_type: import("zod").ZodOptional<import("zod").ZodEnum<{
                    code: "code";
                }>>;
                client_id: import("zod").ZodString;
                redirect_uri: import("zod").ZodOptional<import("zod").ZodURL>;
                scope: import("zod").ZodOptional<import("zod").ZodString>;
                state: import("zod").ZodOptional<import("zod").ZodString>;
                request_uri: import("zod").ZodOptional<import("zod").ZodString>;
                code_challenge: import("zod").ZodOptional<import("zod").ZodString>;
                code_challenge_method: import("zod").ZodOptional<import("zod").ZodEnum<{
                    S256: "S256";
                }>>;
                nonce: import("zod").ZodOptional<import("zod").ZodString>;
                prompt: import("zod").ZodOptional<import("zod").ZodEnum<{
                    none: "none";
                    consent: "consent";
                    login: "login";
                    create: "create";
                    select_account: "select_account";
                    "login consent": "login consent";
                    "select_account consent": "select_account consent";
                }>>;
            }, import("zod/v4/core").$strip>;
            metadata: {
                openapi: {
                    description: string;
                    parameters: ({
                        name: string;
                        in: "query";
                        required: false;
                        schema: {
                            type: "string";
                            format?: undefined;
                        };
                        description: string;
                    } | {
                        name: string;
                        in: "query";
                        required: true;
                        schema: {
                            type: "string";
                            format?: undefined;
                        };
                        description: string;
                    } | {
                        name: string;
                        in: "query";
                        required: false;
                        schema: {
                            type: "string";
                            format: string;
                        };
                        description: string;
                    })[];
                    responses: {
                        "302": {
                            description: string;
                            headers: {
                                Location: {
                                    description: string;
                                    schema: {
                                        type: string;
                                        format: string;
                                    };
                                };
                            };
                        };
                        "400": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            error: {
                                                type: string;
                                            };
                                            error_description: {
                                                type: string;
                                            };
                                            state: {
                                                type: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }, {
            redirect: boolean;
            url: string;
        }>;
        oauth2Consent: import("better-call").StrictEndpoint<"/oauth2/consent", {
            method: "POST";
            body: import("zod").ZodObject<{
                accept: import("zod").ZodBoolean;
                scope: import("zod").ZodOptional<import("zod").ZodString>;
                oauth_query: import("zod").ZodOptional<import("zod").ZodString>;
            }, import("zod/v4/core").$strip>;
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            metadata: {
                openapi: {
                    description: string;
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            redirect_uri: {
                                                type: string;
                                                format: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }, {
            redirect: boolean;
            url: string;
        }>;
        oauth2Continue: import("better-call").StrictEndpoint<"/oauth2/continue", {
            method: "POST";
            body: import("zod").ZodObject<{
                selected: import("zod").ZodOptional<import("zod").ZodBoolean>;
                created: import("zod").ZodOptional<import("zod").ZodBoolean>;
                postLogin: import("zod").ZodOptional<import("zod").ZodBoolean>;
                oauth_query: import("zod").ZodOptional<import("zod").ZodString>;
            }, import("zod/v4/core").$strip>;
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            metadata: {
                openapi: {
                    description: string;
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            redirect_uri: {
                                                type: string;
                                                format: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }, {
            redirect: boolean;
            url: string;
        }>;
        oauth2Token: import("better-call").StrictEndpoint<"/oauth2/token", {
            method: "POST";
            body: import("zod").ZodObject<{
                grant_type: import("zod").ZodEnum<{
                    authorization_code: "authorization_code";
                    client_credentials: "client_credentials";
                    refresh_token: "refresh_token";
                }>;
                client_id: import("zod").ZodOptional<import("zod").ZodString>;
                client_secret: import("zod").ZodOptional<import("zod").ZodString>;
                code: import("zod").ZodOptional<import("zod").ZodString>;
                code_verifier: import("zod").ZodOptional<import("zod").ZodString>;
                redirect_uri: import("zod").ZodOptional<import("zod").ZodURL>;
                refresh_token: import("zod").ZodOptional<import("zod").ZodString>;
                resource: import("zod").ZodOptional<import("zod").ZodString>;
                scope: import("zod").ZodOptional<import("zod").ZodString>;
            }, import("zod/v4/core").$strip>;
            metadata: {
                allowedMediaTypes: string[];
                openapi: {
                    description: string;
                    requestBody: {
                        required: boolean;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        grant_type: {
                                            type: string;
                                            enum: string[];
                                            description: string;
                                        };
                                        client_id: {
                                            type: string;
                                            description: string;
                                        };
                                        client_secret: {
                                            type: string;
                                            description: string;
                                        };
                                        code: {
                                            type: string;
                                            description: string;
                                        };
                                        code_verifier: {
                                            type: string;
                                            description: string;
                                        };
                                        redirect_uri: {
                                            type: string;
                                            format: string;
                                            description: string;
                                        };
                                        refresh_token: {
                                            type: string;
                                            description: string;
                                        };
                                        resource: {
                                            type: string;
                                            description: string;
                                        };
                                        scope: {
                                            type: string;
                                            description: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            access_token: {
                                                type: string;
                                                description: string;
                                            };
                                            token_type: {
                                                type: string;
                                                description: string;
                                                enum: string[];
                                            };
                                            expires_in: {
                                                type: string;
                                                description: string;
                                            };
                                            refresh_token: {
                                                type: string;
                                                description: string;
                                            };
                                            scope: {
                                                type: string;
                                                description: string;
                                            };
                                            id_token: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        "400": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            error: {
                                                type: string;
                                            };
                                            error_description: {
                                                type: string;
                                            };
                                            error_uri: {
                                                type: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }, {
            access_token: string;
            expires_in: number;
            expires_at: number;
            token_type: "Bearer";
            refresh_token: string | undefined;
            scope: string;
            id_token: string | undefined;
        }>;
        oauth2Introspect: import("better-call").StrictEndpoint<"/oauth2/introspect", {
            method: "POST";
            body: import("zod").ZodObject<{
                client_id: import("zod").ZodOptional<import("zod").ZodString>;
                client_secret: import("zod").ZodOptional<import("zod").ZodString>;
                token: import("zod").ZodString;
                token_type_hint: import("zod").ZodOptional<import("zod").ZodEnum<{
                    refresh_token: "refresh_token";
                    access_token: "access_token";
                }>>;
            }, import("zod/v4/core").$strip>;
            metadata: {
                allowedMediaTypes: string[];
                openapi: {
                    description: string;
                    requestBody: {
                        required: boolean;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        client_id: {
                                            type: string;
                                            description: string;
                                        };
                                        client_secret: {
                                            type: string;
                                            description: string;
                                        };
                                        token: {
                                            type: string;
                                            description: string;
                                        };
                                        token_type_hint: {
                                            type: string;
                                            enum: string[];
                                            description: string;
                                        };
                                        resource: {
                                            type: string;
                                            description: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            active: {
                                                type: string;
                                                description: string;
                                            };
                                            scope: {
                                                type: string;
                                                description: string;
                                            };
                                            client_id: {
                                                type: string;
                                                description: string;
                                            };
                                            username: {
                                                type: string;
                                                description: string;
                                            };
                                            token_type: {
                                                type: string;
                                                description: string;
                                            };
                                            exp: {
                                                type: string;
                                                description: string;
                                            };
                                            iat: {
                                                type: string;
                                                description: string;
                                            };
                                            nbf: {
                                                type: string;
                                                description: string;
                                            };
                                            sub: {
                                                type: string;
                                                description: string;
                                            };
                                            aud: {
                                                type: string;
                                                description: string;
                                            };
                                            iss: {
                                                type: string;
                                                description: string;
                                            };
                                            jti: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        "400": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            error: {
                                                type: string;
                                            };
                                            error_description: {
                                                type: string;
                                            };
                                            error_uri: {
                                                type: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }, import("jose").JWTPayload>;
        oauth2Revoke: import("better-call").StrictEndpoint<"/oauth2/revoke", {
            method: "POST";
            body: import("zod").ZodObject<{
                client_id: import("zod").ZodOptional<import("zod").ZodString>;
                client_secret: import("zod").ZodOptional<import("zod").ZodString>;
                token: import("zod").ZodString;
                token_type_hint: import("zod").ZodOptional<import("zod").ZodEnum<{
                    refresh_token: "refresh_token";
                    access_token: "access_token";
                }>>;
            }, import("zod/v4/core").$strip>;
            metadata: {
                allowedMediaTypes: string[];
                openapi: {
                    description: string;
                    requestBody: {
                        required: boolean;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        client_id: {
                                            type: string;
                                            description: string;
                                        };
                                        client_secret: {
                                            type: string;
                                            description: string;
                                        };
                                        token: {
                                            type: string;
                                            description: string;
                                        };
                                        token_type_hint: {
                                            type: string;
                                            enum: string[];
                                            description: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        description: string;
                                    };
                                };
                            };
                        };
                        "400": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            error: {
                                                type: string;
                                            };
                                            error_description: {
                                                type: string;
                                            };
                                            error_uri: {
                                                type: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }, null | undefined>;
        oauth2UserInfo: import("better-call").StrictEndpoint<"/oauth2/userinfo", {
            method: "GET";
            metadata: {
                openapi: {
                    description: string;
                    security: ({
                        bearerAuth: never[];
                        OAuth2?: undefined;
                    } | {
                        OAuth2: string[];
                        bearerAuth?: undefined;
                    })[];
                    parameters: {
                        name: string;
                        in: "header";
                        required: false;
                        schema: {
                            type: "string";
                        };
                        description: string;
                    }[];
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            sub: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                format: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            name: {
                                                type: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            picture: {
                                                type: string;
                                                format: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            given_name: {
                                                type: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            family_name: {
                                                type: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            email_verified: {
                                                type: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        "401": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            error: {
                                                type: string;
                                            };
                                            error_description: {
                                                type: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        "403": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            error: {
                                                type: string;
                                            };
                                            error_description: {
                                                type: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }, {
            email?: string | undefined;
            email_verified?: boolean | undefined;
            name?: string | undefined;
            picture?: string | undefined;
            given_name?: string | undefined;
            family_name?: string | undefined;
            sub: string;
        }>;
        oauth2EndSession: import("better-call").StrictEndpoint<"/oauth2/end-session", {
            method: "GET";
            query: import("zod").ZodObject<{
                id_token_hint: import("zod").ZodString;
                client_id: import("zod").ZodOptional<import("zod").ZodString>;
                post_logout_redirect_uri: import("zod").ZodOptional<import("zod").ZodURL>;
                state: import("zod").ZodOptional<import("zod").ZodString>;
            }, import("zod/v4/core").$strip>;
            metadata: {
                openapi: {
                    description: string;
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            redirect_uri: {
                                                type: string;
                                                format: string;
                                                description: string;
                                            };
                                            message: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }, {
            redirect: boolean;
            url: string;
        } | undefined>;
        registerOAuthClient: import("better-call").StrictEndpoint<"/oauth2/register", {
            method: "POST";
            body: import("zod").ZodObject<{
                redirect_uris: import("zod").ZodArray<import("zod").ZodURL>;
                scope: import("zod").ZodOptional<import("zod").ZodString>;
                client_name: import("zod").ZodOptional<import("zod").ZodString>;
                client_uri: import("zod").ZodOptional<import("zod").ZodString>;
                logo_uri: import("zod").ZodOptional<import("zod").ZodString>;
                contacts: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString>>;
                tos_uri: import("zod").ZodOptional<import("zod").ZodString>;
                policy_uri: import("zod").ZodOptional<import("zod").ZodString>;
                software_id: import("zod").ZodOptional<import("zod").ZodString>;
                software_version: import("zod").ZodOptional<import("zod").ZodString>;
                software_statement: import("zod").ZodOptional<import("zod").ZodString>;
                post_logout_redirect_uris: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodURL>>;
                token_endpoint_auth_method: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEnum<{
                    none: "none";
                    client_secret_basic: "client_secret_basic";
                    client_secret_post: "client_secret_post";
                }>>>;
                grant_types: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodEnum<{
                    authorization_code: "authorization_code";
                    client_credentials: "client_credentials";
                    refresh_token: "refresh_token";
                }>>>>;
                response_types: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodEnum<{
                    code: "code";
                }>>>>;
                type: import("zod").ZodOptional<import("zod").ZodEnum<{
                    web: "web";
                    native: "native";
                    "user-agent-based": "user-agent-based";
                }>>;
                subject_type: import("zod").ZodOptional<import("zod").ZodEnum<{
                    public: "public";
                    pairwise: "pairwise";
                }>>;
                skip_consent: import("zod").ZodOptional<import("zod").ZodNever>;
            }, import("zod/v4/core").$strip>;
            metadata: {
                openapi: {
                    description: string;
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            client_id: {
                                                type: string;
                                                description: string;
                                            };
                                            client_secret: {
                                                type: string;
                                                description: string;
                                            };
                                            client_secret_expires_at: {
                                                type: string;
                                                description: string;
                                            };
                                            scope: {
                                                type: string;
                                                description: string;
                                            };
                                            user_id: {
                                                type: string;
                                                description: string;
                                            };
                                            client_id_issued_at: {
                                                type: string;
                                                description: string;
                                            };
                                            client_name: {
                                                type: string;
                                                description: string;
                                            };
                                            client_uri: {
                                                type: string;
                                                description: string;
                                            };
                                            logo_uri: {
                                                type: string;
                                                description: string;
                                            };
                                            contacts: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                };
                                                description: string;
                                            };
                                            tos_uri: {
                                                type: string;
                                                description: string;
                                            };
                                            policy_uri: {
                                                type: string;
                                                description: string;
                                            };
                                            software_id: {
                                                type: string;
                                                description: string;
                                            };
                                            software_version: {
                                                type: string;
                                                description: string;
                                            };
                                            software_statement: {
                                                type: string;
                                                description: string;
                                            };
                                            redirect_uris: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    format: string;
                                                };
                                                description: string;
                                            };
                                            post_logout_redirect_uris: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    format: string;
                                                };
                                                description: string;
                                            };
                                            token_endpoint_auth_method: {
                                                type: string;
                                                description: string;
                                                enum: string[];
                                            };
                                            grant_types: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    enum: string[];
                                                };
                                                description: string;
                                            };
                                            response_types: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    enum: string[];
                                                };
                                                description: string;
                                            };
                                            public: {
                                                type: string;
                                                description: string;
                                            };
                                            type: {
                                                type: string;
                                                description: string;
                                                enum: string[];
                                            };
                                            disabled: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }, import("@better-auth/oauth-provider").OAuthClient>;
        adminCreateOAuthClient: import("better-call").StrictEndpoint<"/admin/oauth2/create-client", {
            method: "POST";
            body: import("zod").ZodObject<{
                redirect_uris: import("zod").ZodArray<import("zod").ZodURL>;
                scope: import("zod").ZodOptional<import("zod").ZodString>;
                client_name: import("zod").ZodOptional<import("zod").ZodString>;
                client_uri: import("zod").ZodOptional<import("zod").ZodString>;
                logo_uri: import("zod").ZodOptional<import("zod").ZodString>;
                contacts: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString>>;
                tos_uri: import("zod").ZodOptional<import("zod").ZodString>;
                policy_uri: import("zod").ZodOptional<import("zod").ZodString>;
                software_id: import("zod").ZodOptional<import("zod").ZodString>;
                software_version: import("zod").ZodOptional<import("zod").ZodString>;
                software_statement: import("zod").ZodOptional<import("zod").ZodString>;
                post_logout_redirect_uris: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodURL>>;
                token_endpoint_auth_method: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEnum<{
                    none: "none";
                    client_secret_basic: "client_secret_basic";
                    client_secret_post: "client_secret_post";
                }>>>;
                grant_types: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodEnum<{
                    authorization_code: "authorization_code";
                    client_credentials: "client_credentials";
                    refresh_token: "refresh_token";
                }>>>>;
                response_types: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodEnum<{
                    code: "code";
                }>>>>;
                type: import("zod").ZodOptional<import("zod").ZodEnum<{
                    web: "web";
                    native: "native";
                    "user-agent-based": "user-agent-based";
                }>>;
                client_secret_expires_at: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodUnion<readonly [import("zod").ZodString, import("zod").ZodNumber]>>>;
                skip_consent: import("zod").ZodOptional<import("zod").ZodBoolean>;
                enable_end_session: import("zod").ZodOptional<import("zod").ZodBoolean>;
                require_pkce: import("zod").ZodOptional<import("zod").ZodBoolean>;
                subject_type: import("zod").ZodOptional<import("zod").ZodEnum<{
                    public: "public";
                    pairwise: "pairwise";
                }>>;
                metadata: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
            }, import("zod/v4/core").$strip>;
            metadata: {
                SERVER_ONLY: true;
                openapi: {
                    description: string;
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            client_id: {
                                                type: string;
                                                description: string;
                                            };
                                            client_secret: {
                                                type: string;
                                                description: string;
                                            };
                                            client_secret_expires_at: {
                                                type: string;
                                                description: string;
                                            };
                                            scope: {
                                                type: string;
                                                description: string;
                                            };
                                            user_id: {
                                                type: string;
                                                description: string;
                                            };
                                            client_id_issued_at: {
                                                type: string;
                                                description: string;
                                            };
                                            client_name: {
                                                type: string;
                                                description: string;
                                            };
                                            client_uri: {
                                                type: string;
                                                description: string;
                                            };
                                            logo_uri: {
                                                type: string;
                                                description: string;
                                            };
                                            contacts: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                };
                                                description: string;
                                            };
                                            tos_uri: {
                                                type: string;
                                                description: string;
                                            };
                                            policy_uri: {
                                                type: string;
                                                description: string;
                                            };
                                            software_id: {
                                                type: string;
                                                description: string;
                                            };
                                            software_version: {
                                                type: string;
                                                description: string;
                                            };
                                            software_statement: {
                                                type: string;
                                                description: string;
                                            };
                                            redirect_uris: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    format: string;
                                                };
                                                description: string;
                                            };
                                            token_endpoint_auth_method: {
                                                type: string;
                                                description: string;
                                                enum: string[];
                                            };
                                            grant_types: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    enum: string[];
                                                };
                                                description: string;
                                            };
                                            response_types: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    enum: string[];
                                                };
                                                description: string;
                                            };
                                            public: {
                                                type: string;
                                                description: string;
                                            };
                                            type: {
                                                type: string;
                                                description: string;
                                                enum: string[];
                                            };
                                            disabled: {
                                                type: string;
                                                description: string;
                                            };
                                            require_pkce: {
                                                type: string;
                                                description: string;
                                                default: boolean;
                                            };
                                            metadata: {
                                                type: string;
                                                additionalProperties: boolean;
                                                nullable: boolean;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }, import("@better-auth/oauth-provider").OAuthClient>;
        createOAuthClient: import("better-call").StrictEndpoint<"/oauth2/create-client", {
            method: "POST";
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            body: import("zod").ZodObject<{
                redirect_uris: import("zod").ZodArray<import("zod").ZodURL>;
                scope: import("zod").ZodOptional<import("zod").ZodString>;
                client_name: import("zod").ZodOptional<import("zod").ZodString>;
                client_uri: import("zod").ZodOptional<import("zod").ZodString>;
                logo_uri: import("zod").ZodOptional<import("zod").ZodString>;
                contacts: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString>>;
                tos_uri: import("zod").ZodOptional<import("zod").ZodString>;
                policy_uri: import("zod").ZodOptional<import("zod").ZodString>;
                software_id: import("zod").ZodOptional<import("zod").ZodString>;
                software_version: import("zod").ZodOptional<import("zod").ZodString>;
                software_statement: import("zod").ZodOptional<import("zod").ZodString>;
                post_logout_redirect_uris: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodURL>>;
                token_endpoint_auth_method: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEnum<{
                    none: "none";
                    client_secret_basic: "client_secret_basic";
                    client_secret_post: "client_secret_post";
                }>>>;
                grant_types: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodEnum<{
                    authorization_code: "authorization_code";
                    client_credentials: "client_credentials";
                    refresh_token: "refresh_token";
                }>>>>;
                response_types: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodEnum<{
                    code: "code";
                }>>>>;
                type: import("zod").ZodOptional<import("zod").ZodEnum<{
                    web: "web";
                    native: "native";
                    "user-agent-based": "user-agent-based";
                }>>;
            }, import("zod/v4/core").$strip>;
            metadata: {
                openapi: {
                    description: string;
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            client_id: {
                                                type: string;
                                                description: string;
                                            };
                                            client_secret: {
                                                type: string;
                                                description: string;
                                            };
                                            client_secret_expires_at: {
                                                type: string;
                                                description: string;
                                            };
                                            scope: {
                                                type: string;
                                                description: string;
                                            };
                                            user_id: {
                                                type: string;
                                                description: string;
                                            };
                                            client_id_issued_at: {
                                                type: string;
                                                description: string;
                                            };
                                            client_name: {
                                                type: string;
                                                description: string;
                                            };
                                            client_uri: {
                                                type: string;
                                                description: string;
                                            };
                                            logo_uri: {
                                                type: string;
                                                description: string;
                                            };
                                            contacts: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                };
                                                description: string;
                                            };
                                            tos_uri: {
                                                type: string;
                                                description: string;
                                            };
                                            policy_uri: {
                                                type: string;
                                                description: string;
                                            };
                                            software_id: {
                                                type: string;
                                                description: string;
                                            };
                                            software_version: {
                                                type: string;
                                                description: string;
                                            };
                                            software_statement: {
                                                type: string;
                                                description: string;
                                            };
                                            redirect_uris: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    format: string;
                                                };
                                                description: string;
                                            };
                                            token_endpoint_auth_method: {
                                                type: string;
                                                description: string;
                                                enum: string[];
                                            };
                                            grant_types: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    enum: string[];
                                                };
                                                description: string;
                                            };
                                            response_types: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                    enum: string[];
                                                };
                                                description: string;
                                            };
                                            public: {
                                                type: string;
                                                description: string;
                                            };
                                            type: {
                                                type: string;
                                                description: string;
                                                enum: string[];
                                            };
                                            disabled: {
                                                type: string;
                                                description: string;
                                            };
                                            metadata: {
                                                type: string;
                                                additionalProperties: boolean;
                                                nullable: boolean;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }, import("@better-auth/oauth-provider").OAuthClient>;
        getOAuthClient: import("better-call").StrictEndpoint<"/oauth2/get-client", {
            method: "GET";
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            query: import("zod").ZodObject<{
                client_id: import("zod").ZodString;
            }, import("zod/v4/core").$strip>;
            metadata: {
                openapi: {
                    description: string;
                };
            };
        }, import("@better-auth/oauth-provider").OAuthClient>;
        getOAuthClientPublic: import("better-call").StrictEndpoint<"/oauth2/public-client", {
            method: "GET";
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            query: import("zod").ZodObject<{
                client_id: import("zod").ZodString;
            }, import("zod/v4/core").$strip>;
            metadata: {
                openapi: {
                    description: string;
                };
            };
        }, import("@better-auth/oauth-provider").OAuthClient>;
        getOAuthClientPublicPrelogin: import("better-call").StrictEndpoint<"/oauth2/public-client-prelogin", {
            method: "POST";
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<void>)[];
            body: import("zod").ZodObject<{
                client_id: import("zod").ZodString;
                oauth_query: import("zod").ZodOptional<import("zod").ZodString>;
            }, import("zod/v4/core").$strip>;
            metadata: {
                openapi: {
                    description: string;
                };
            };
        }, import("@better-auth/oauth-provider").OAuthClient>;
        getOAuthClients: import("better-call").StrictEndpoint<"/oauth2/get-clients", {
            method: "GET";
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            metadata: {
                openapi: {
                    description: string;
                };
            };
        }, import("@better-auth/oauth-provider").OAuthClient[] | null>;
        adminUpdateOAuthClient: import("better-call").StrictEndpoint<"/admin/oauth2/update-client", {
            method: "PATCH";
            body: import("zod").ZodObject<{
                client_id: import("zod").ZodString;
                update: import("zod").ZodObject<{
                    redirect_uris: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodURL>>;
                    scope: import("zod").ZodOptional<import("zod").ZodString>;
                    client_name: import("zod").ZodOptional<import("zod").ZodString>;
                    client_uri: import("zod").ZodOptional<import("zod").ZodString>;
                    logo_uri: import("zod").ZodOptional<import("zod").ZodString>;
                    contacts: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString>>;
                    tos_uri: import("zod").ZodOptional<import("zod").ZodString>;
                    policy_uri: import("zod").ZodOptional<import("zod").ZodString>;
                    software_id: import("zod").ZodOptional<import("zod").ZodString>;
                    software_version: import("zod").ZodOptional<import("zod").ZodString>;
                    software_statement: import("zod").ZodOptional<import("zod").ZodString>;
                    post_logout_redirect_uris: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodURL>>;
                    grant_types: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodEnum<{
                        authorization_code: "authorization_code";
                        client_credentials: "client_credentials";
                        refresh_token: "refresh_token";
                    }>>>;
                    response_types: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodEnum<{
                        code: "code";
                    }>>>;
                    type: import("zod").ZodOptional<import("zod").ZodEnum<{
                        web: "web";
                        native: "native";
                        "user-agent-based": "user-agent-based";
                    }>>;
                    client_secret_expires_at: import("zod").ZodOptional<import("zod").ZodUnion<readonly [import("zod").ZodString, import("zod").ZodNumber]>>;
                    skip_consent: import("zod").ZodOptional<import("zod").ZodBoolean>;
                    enable_end_session: import("zod").ZodOptional<import("zod").ZodBoolean>;
                    metadata: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
                }, import("zod/v4/core").$strip>;
            }, import("zod/v4/core").$strip>;
            metadata: {
                SERVER_ONLY: true;
                openapi: {
                    description: string;
                };
            };
        }, import("@better-auth/oauth-provider").OAuthClient>;
        updateOAuthClient: import("better-call").StrictEndpoint<"/oauth2/update-client", {
            method: "POST";
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            body: import("zod").ZodObject<{
                client_id: import("zod").ZodString;
                update: import("zod").ZodObject<{
                    redirect_uris: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodURL>>;
                    scope: import("zod").ZodOptional<import("zod").ZodString>;
                    client_name: import("zod").ZodOptional<import("zod").ZodString>;
                    client_uri: import("zod").ZodOptional<import("zod").ZodString>;
                    logo_uri: import("zod").ZodOptional<import("zod").ZodString>;
                    contacts: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString>>;
                    tos_uri: import("zod").ZodOptional<import("zod").ZodString>;
                    policy_uri: import("zod").ZodOptional<import("zod").ZodString>;
                    software_id: import("zod").ZodOptional<import("zod").ZodString>;
                    software_version: import("zod").ZodOptional<import("zod").ZodString>;
                    software_statement: import("zod").ZodOptional<import("zod").ZodString>;
                    post_logout_redirect_uris: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodURL>>;
                    grant_types: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodEnum<{
                        authorization_code: "authorization_code";
                        client_credentials: "client_credentials";
                        refresh_token: "refresh_token";
                    }>>>;
                    response_types: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodEnum<{
                        code: "code";
                    }>>>;
                    type: import("zod").ZodOptional<import("zod").ZodEnum<{
                        web: "web";
                        native: "native";
                        "user-agent-based": "user-agent-based";
                    }>>;
                }, import("zod/v4/core").$strip>;
            }, import("zod/v4/core").$strip>;
            metadata: {
                openapi: {
                    description: string;
                };
            };
        }, import("@better-auth/oauth-provider").OAuthClient>;
        rotateClientSecret: import("better-call").StrictEndpoint<"/oauth2/client/rotate-secret", {
            method: "POST";
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            body: import("zod").ZodObject<{
                client_id: import("zod").ZodString;
            }, import("zod/v4/core").$strip>;
            metadata: {
                openapi: {
                    description: string;
                };
            };
        }, import("@better-auth/oauth-provider").OAuthClient>;
        deleteOAuthClient: import("better-call").StrictEndpoint<"/oauth2/delete-client", {
            method: "POST";
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            body: import("zod").ZodObject<{
                client_id: import("zod").ZodString;
            }, import("zod/v4/core").$strip>;
            metadata: {
                openapi: {
                    description: string;
                };
            };
        }, void>;
        getOAuthConsent: import("better-call").StrictEndpoint<"/oauth2/get-consent", {
            method: "GET";
            query: import("zod").ZodObject<{
                id: import("zod").ZodString;
            }, import("zod/v4/core").$strip>;
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            metadata: {
                openapi: {
                    description: string;
                };
            };
        }, import("@better-auth/oauth-provider").OAuthConsent<Scope[]>>;
        getOAuthConsents: import("better-call").StrictEndpoint<"/oauth2/get-consents", {
            method: "GET";
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            metadata: {
                openapi: {
                    description: string;
                };
            };
        }, import("@better-auth/oauth-provider").OAuthConsent<Scope[]>[]>;
        updateOAuthConsent: import("better-call").StrictEndpoint<"/oauth2/update-consent", {
            method: "POST";
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            body: import("zod").ZodObject<{
                id: import("zod").ZodString;
                update: import("zod").ZodObject<{
                    scopes: import("zod").ZodArray<import("zod").ZodString>;
                }, import("zod/v4/core").$strip>;
            }, import("zod/v4/core").$strip>;
            metadata: {
                openapi: {
                    description: string;
                };
            };
        }, import("@better-auth/oauth-provider").OAuthConsent<Scope[]> | null>;
        deleteOAuthConsent: import("better-call").StrictEndpoint<"/oauth2/delete-consent", {
            method: "POST";
            use: ((inputContext: import("better-call").MiddlewareInputContext<import("better-call").MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
            body: import("zod").ZodObject<{
                id: import("zod").ZodString;
            }, import("zod/v4/core").$strip>;
            metadata: {
                openapi: {
                    description: string;
                };
            };
        }, void>;
    };
    schema: {
        jwks: {
            fields: {
                publicKey: {
                    type: "string";
                    required: true;
                };
                privateKey: {
                    type: "string";
                    required: true;
                };
                createdAt: {
                    type: "date";
                    required: true;
                };
                expiresAt: {
                    type: "date";
                    required: false;
                };
            };
        };
        oauthClient: {
            modelName: string;
            fields: {
                clientId: {
                    type: "string";
                    unique: true;
                    required: true;
                };
                clientSecret: {
                    type: "string";
                    required: false;
                };
                disabled: {
                    type: "boolean";
                    defaultValue: false;
                    required: false;
                };
                skipConsent: {
                    type: "boolean";
                    required: false;
                };
                enableEndSession: {
                    type: "boolean";
                    required: false;
                };
                subjectType: {
                    type: "string";
                    required: false;
                };
                scopes: {
                    type: "string[]";
                    required: false;
                };
                userId: {
                    type: "string";
                    required: false;
                    references: {
                        model: string;
                        field: string;
                    };
                    index: true;
                };
                createdAt: {
                    type: "date";
                    required: false;
                };
                updatedAt: {
                    type: "date";
                    required: false;
                };
                name: {
                    type: "string";
                    required: false;
                };
                uri: {
                    type: "string";
                    required: false;
                };
                icon: {
                    type: "string";
                    required: false;
                };
                contacts: {
                    type: "string[]";
                    required: false;
                };
                tos: {
                    type: "string";
                    required: false;
                };
                policy: {
                    type: "string";
                    required: false;
                };
                softwareId: {
                    type: "string";
                    required: false;
                };
                softwareVersion: {
                    type: "string";
                    required: false;
                };
                softwareStatement: {
                    type: "string";
                    required: false;
                };
                redirectUris: {
                    type: "string[]";
                    required: true;
                };
                postLogoutRedirectUris: {
                    type: "string[]";
                    required: false;
                };
                tokenEndpointAuthMethod: {
                    type: "string";
                    required: false;
                };
                grantTypes: {
                    type: "string[]";
                    required: false;
                };
                responseTypes: {
                    type: "string[]";
                    required: false;
                };
                public: {
                    type: "boolean";
                    required: false;
                };
                type: {
                    type: "string";
                    required: false;
                };
                requirePKCE: {
                    type: "boolean";
                    required: false;
                };
                referenceId: {
                    type: "string";
                    required: false;
                };
                metadata: {
                    type: "json";
                    required: false;
                };
            };
        };
        oauthRefreshToken: {
            fields: {
                token: {
                    type: "string";
                    required: true;
                    unique: true;
                };
                clientId: {
                    type: "string";
                    required: true;
                    references: {
                        model: string;
                        field: string;
                    };
                    index: true;
                };
                sessionId: {
                    type: "string";
                    required: false;
                    references: {
                        model: string;
                        field: string;
                        onDelete: "set null";
                    };
                    index: true;
                };
                userId: {
                    type: "string";
                    required: true;
                    references: {
                        model: string;
                        field: string;
                    };
                    index: true;
                };
                referenceId: {
                    type: "string";
                    required: false;
                };
                expiresAt: {
                    type: "date";
                };
                createdAt: {
                    type: "date";
                };
                revoked: {
                    type: "date";
                    required: false;
                };
                authTime: {
                    type: "date";
                    required: false;
                };
                scopes: {
                    type: "string[]";
                    required: true;
                };
            };
        };
        oauthAccessToken: {
            modelName: string;
            fields: {
                token: {
                    type: "string";
                    unique: true;
                };
                clientId: {
                    type: "string";
                    required: true;
                    references: {
                        model: string;
                        field: string;
                    };
                    index: true;
                };
                sessionId: {
                    type: "string";
                    required: false;
                    references: {
                        model: string;
                        field: string;
                        onDelete: "set null";
                    };
                    index: true;
                };
                userId: {
                    type: "string";
                    required: false;
                    references: {
                        model: string;
                        field: string;
                    };
                    index: true;
                };
                referenceId: {
                    type: "string";
                    required: false;
                };
                refreshId: {
                    type: "string";
                    required: false;
                    references: {
                        model: string;
                        field: string;
                    };
                    index: true;
                };
                expiresAt: {
                    type: "date";
                };
                createdAt: {
                    type: "date";
                };
                scopes: {
                    type: "string[]";
                    required: true;
                };
            };
        };
        oauthConsent: {
            modelName: string;
            fields: {
                clientId: {
                    type: "string";
                    required: true;
                    references: {
                        model: string;
                        field: string;
                    };
                    index: true;
                };
                userId: {
                    type: "string";
                    required: false;
                    references: {
                        model: string;
                        field: string;
                    };
                    index: true;
                };
                referenceId: {
                    type: "string";
                    required: false;
                };
                scopes: {
                    type: "string[]";
                    required: true;
                };
                createdAt: {
                    type: "date";
                };
                updatedAt: {
                    type: "date";
                };
            };
        };
        user: {
            readonly fields: {
                readonly userId: {
                    readonly type: "string";
                    readonly required: false;
                    readonly input: false;
                };
            };
        };
    };
};
export {};
//# sourceMappingURL=index.d.ts.map