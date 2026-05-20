import { mcpHandler, oauthProviderAuthServerMetadata, } from "@better-auth/oauth-provider";
const exposeAuthenticateHeader = (response) => {
    if (response.status !== 401 ||
        !response.headers.has("WWW-Authenticate")) {
        return response;
    }
    const headers = new Headers(response.headers);
    const exposeHeader = "Access-Control-Expose-Headers";
    const authenticateHeader = "WWW-Authenticate";
    const exposedHeaders = headers
        .get(exposeHeader)
        ?.split(",")
        .map((header) => header.trim())
        .filter(Boolean) ?? [];
    const hasAuthenticateHeader = exposedHeaders.some((header) => header.toLowerCase() === authenticateHeader.toLowerCase());
    if (!hasAuthenticateHeader) {
        exposedHeaders.push(authenticateHeader);
    }
    headers.set(exposeHeader, exposedHeaders.join(", "));
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
};
export const withMcpAuth = (verifyOptions, handler, opts) => {
    const protectedHandler = mcpHandler(verifyOptions, handler, {
        resourceMetadataMappings: opts?.resourceMetadataMappings ?? {},
    });
    return async (req) => {
        const response = await protectedHandler(req);
        return exposeAuthenticateHeader(response);
    };
};
export const oAuthDiscoveryMetadata = oauthProviderAuthServerMetadata;
export const oAuthProtectedResourceMetadata = (opts) => {
    return async () => {
        return Response.json({
            resource: opts.resource,
            authorization_servers: opts.authorizationServers,
            scopes_supported: opts.scopesSupported,
            bearer_methods_supported: opts.bearerMethodsSupported ?? ["header"],
            ...opts.extraMetadata,
        });
    };
};
//# sourceMappingURL=index.js.map