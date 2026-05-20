declare const schema: import("convex/server").SchemaDefinition<{
    user: import("convex/server").TableDefinition<import("convex/values").VObject<{
        image?: string | null | undefined;
        userId?: string | null | undefined;
        username?: string | null | undefined;
        twoFactorEnabled?: boolean | null | undefined;
        isAnonymous?: boolean | null | undefined;
        displayUsername?: string | null | undefined;
        phoneNumber?: string | null | undefined;
        phoneNumberVerified?: boolean | null | undefined;
        customField?: string | null | undefined;
        numericField?: number | null | undefined;
        testField?: string | null | undefined;
        cbDefaultValueField?: string | null | undefined;
        dateField?: number | null | undefined;
        email: string;
        createdAt: number;
        updatedAt: number;
        emailVerified: boolean;
        name: string;
    }, {
        name: import("convex/values").VString<string, "required">;
        email: import("convex/values").VString<string, "required">;
        emailVerified: import("convex/values").VBoolean<boolean, "required">;
        image: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VFloat64<number, "required">;
        twoFactorEnabled: import("convex/values").VUnion<boolean | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VBoolean<boolean, "required">], "optional", never>;
        isAnonymous: import("convex/values").VUnion<boolean | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VBoolean<boolean, "required">], "optional", never>;
        username: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        displayUsername: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        phoneNumber: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        phoneNumberVerified: import("convex/values").VUnion<boolean | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VBoolean<boolean, "required">], "optional", never>;
        userId: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        customField: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        numericField: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
        testField: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        cbDefaultValueField: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        dateField: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
    }, "required", "email" | "createdAt" | "updatedAt" | "emailVerified" | "name" | "image" | "userId" | "username" | "twoFactorEnabled" | "isAnonymous" | "displayUsername" | "phoneNumber" | "phoneNumberVerified" | "customField" | "numericField" | "testField" | "cbDefaultValueField" | "dateField">, {
        email_name: ["email", "name", "_creationTime"];
        name: ["name", "_creationTime"];
        userId: ["userId", "_creationTime"];
        username: ["username", "_creationTime"];
        phoneNumber: ["phoneNumber", "_creationTime"];
        customField: ["customField", "_creationTime"];
        numericField: ["numericField", "_creationTime"];
        dateField: ["dateField", "_creationTime"];
    }, {}, {}>;
    session: import("convex/server").TableDefinition<import("convex/values").VObject<{
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
        createdAt: number;
        updatedAt: number;
        userId: string;
        expiresAt: number;
        token: string;
    }, {
        expiresAt: import("convex/values").VFloat64<number, "required">;
        token: import("convex/values").VString<string, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VFloat64<number, "required">;
        ipAddress: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        userAgent: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        userId: import("convex/values").VString<string, "required">;
    }, "required", "createdAt" | "updatedAt" | "userId" | "expiresAt" | "token" | "ipAddress" | "userAgent">, {
        expiresAt: ["expiresAt", "_creationTime"];
        expiresAt_userId: ["expiresAt", "userId", "_creationTime"];
        token: ["token", "_creationTime"];
        userId: ["userId", "_creationTime"];
    }, {}, {}>;
    account: import("convex/server").TableDefinition<import("convex/values").VObject<{
        password?: string | null | undefined;
        scope?: string | null | undefined;
        accessToken?: string | null | undefined;
        refreshToken?: string | null | undefined;
        idToken?: string | null | undefined;
        accessTokenExpiresAt?: number | null | undefined;
        refreshTokenExpiresAt?: number | null | undefined;
        createdAt: number;
        updatedAt: number;
        userId: string;
        accountId: string;
        providerId: string;
    }, {
        accountId: import("convex/values").VString<string, "required">;
        providerId: import("convex/values").VString<string, "required">;
        userId: import("convex/values").VString<string, "required">;
        accessToken: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        refreshToken: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        idToken: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        accessTokenExpiresAt: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
        refreshTokenExpiresAt: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
        scope: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        password: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VFloat64<number, "required">;
    }, "required", "createdAt" | "updatedAt" | "userId" | "password" | "scope" | "accountId" | "providerId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt">, {
        accountId: ["accountId", "_creationTime"];
        accountId_providerId: ["accountId", "providerId", "_creationTime"];
        providerId_userId: ["providerId", "userId", "_creationTime"];
        userId: ["userId", "_creationTime"];
    }, {}, {}>;
    verification: import("convex/server").TableDefinition<import("convex/values").VObject<{
        createdAt: number;
        updatedAt: number;
        expiresAt: number;
        value: string;
        identifier: string;
    }, {
        identifier: import("convex/values").VString<string, "required">;
        value: import("convex/values").VString<string, "required">;
        expiresAt: import("convex/values").VFloat64<number, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VFloat64<number, "required">;
    }, "required", "createdAt" | "updatedAt" | "expiresAt" | "value" | "identifier">, {
        expiresAt: ["expiresAt", "_creationTime"];
        identifier: ["identifier", "_creationTime"];
    }, {}, {}>;
    twoFactor: import("convex/server").TableDefinition<import("convex/values").VObject<{
        verified?: boolean | null | undefined;
        userId: string;
        secret: string;
        backupCodes: string;
    }, {
        secret: import("convex/values").VString<string, "required">;
        backupCodes: import("convex/values").VString<string, "required">;
        userId: import("convex/values").VString<string, "required">;
        verified: import("convex/values").VUnion<boolean | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VBoolean<boolean, "required">], "optional", never>;
    }, "required", "userId" | "secret" | "backupCodes" | "verified">, {
        userId: ["userId", "_creationTime"];
    }, {}, {}>;
    jwks: import("convex/server").TableDefinition<import("convex/values").VObject<{
        expiresAt?: number | null | undefined;
        createdAt: number;
        publicKey: string;
        privateKey: string;
    }, {
        publicKey: import("convex/values").VString<string, "required">;
        privateKey: import("convex/values").VString<string, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        expiresAt: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
    }, "required", "createdAt" | "expiresAt" | "publicKey" | "privateKey">, {}, {}, {}>;
    oauthClient: import("convex/server").TableDefinition<import("convex/values").VObject<{
        type?: string | null | undefined;
        metadata?: string | null | undefined;
        scopes?: string[] | null | undefined;
        grantTypes?: string[] | null | undefined;
        createdAt?: number | null | undefined;
        updatedAt?: number | null | undefined;
        name?: string | null | undefined;
        userId?: string | null | undefined;
        contacts?: string[] | null | undefined;
        public?: boolean | null | undefined;
        clientSecret?: string | null | undefined;
        disabled?: boolean | null | undefined;
        skipConsent?: boolean | null | undefined;
        enableEndSession?: boolean | null | undefined;
        subjectType?: string | null | undefined;
        uri?: string | null | undefined;
        icon?: string | null | undefined;
        tos?: string | null | undefined;
        policy?: string | null | undefined;
        softwareId?: string | null | undefined;
        softwareVersion?: string | null | undefined;
        softwareStatement?: string | null | undefined;
        postLogoutRedirectUris?: string[] | null | undefined;
        tokenEndpointAuthMethod?: string | null | undefined;
        responseTypes?: string[] | null | undefined;
        requirePKCE?: boolean | null | undefined;
        referenceId?: string | null | undefined;
        clientId: string;
        redirectUris: string[];
    }, {
        clientId: import("convex/values").VString<string, "required">;
        clientSecret: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        disabled: import("convex/values").VUnion<boolean | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VBoolean<boolean, "required">], "optional", never>;
        skipConsent: import("convex/values").VUnion<boolean | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VBoolean<boolean, "required">], "optional", never>;
        enableEndSession: import("convex/values").VUnion<boolean | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VBoolean<boolean, "required">], "optional", never>;
        subjectType: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        scopes: import("convex/values").VUnion<string[] | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">], "optional", never>;
        userId: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        createdAt: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
        updatedAt: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
        name: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        uri: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        icon: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        contacts: import("convex/values").VUnion<string[] | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">], "optional", never>;
        tos: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        policy: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        softwareId: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        softwareVersion: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        softwareStatement: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        redirectUris: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">;
        postLogoutRedirectUris: import("convex/values").VUnion<string[] | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">], "optional", never>;
        tokenEndpointAuthMethod: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        grantTypes: import("convex/values").VUnion<string[] | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">], "optional", never>;
        responseTypes: import("convex/values").VUnion<string[] | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">], "optional", never>;
        public: import("convex/values").VUnion<boolean | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VBoolean<boolean, "required">], "optional", never>;
        type: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        requirePKCE: import("convex/values").VUnion<boolean | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VBoolean<boolean, "required">], "optional", never>;
        referenceId: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        metadata: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
    }, "required", "type" | "metadata" | "scopes" | "grantTypes" | "createdAt" | "updatedAt" | "name" | "userId" | "contacts" | "public" | "clientId" | "clientSecret" | "disabled" | "skipConsent" | "enableEndSession" | "subjectType" | "uri" | "icon" | "tos" | "policy" | "softwareId" | "softwareVersion" | "softwareStatement" | "redirectUris" | "postLogoutRedirectUris" | "tokenEndpointAuthMethod" | "responseTypes" | "requirePKCE" | "referenceId">, {
        clientId: ["clientId", "_creationTime"];
        userId: ["userId", "_creationTime"];
        referenceId: ["referenceId", "_creationTime"];
    }, {}, {}>;
    oauthRefreshToken: import("convex/server").TableDefinition<import("convex/values").VObject<{
        createdAt?: number | null | undefined;
        expiresAt?: number | null | undefined;
        sessionId?: string | null | undefined;
        referenceId?: string | null | undefined;
        revoked?: number | null | undefined;
        authTime?: number | null | undefined;
        scopes: string[];
        userId: string;
        token: string;
        clientId: string;
    }, {
        token: import("convex/values").VString<string, "required">;
        clientId: import("convex/values").VString<string, "required">;
        sessionId: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        userId: import("convex/values").VString<string, "required">;
        referenceId: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        expiresAt: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
        createdAt: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
        revoked: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
        authTime: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
        scopes: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">;
    }, "required", "scopes" | "createdAt" | "userId" | "expiresAt" | "token" | "sessionId" | "clientId" | "referenceId" | "revoked" | "authTime">, {
        token: ["token", "_creationTime"];
        clientId: ["clientId", "_creationTime"];
        sessionId: ["sessionId", "_creationTime"];
        userId: ["userId", "_creationTime"];
        referenceId: ["referenceId", "_creationTime"];
    }, {}, {}>;
    oauthAccessToken: import("convex/server").TableDefinition<import("convex/values").VObject<{
        createdAt?: number | null | undefined;
        userId?: string | null | undefined;
        expiresAt?: number | null | undefined;
        token?: string | null | undefined;
        sessionId?: string | null | undefined;
        referenceId?: string | null | undefined;
        refreshId?: string | null | undefined;
        scopes: string[];
        clientId: string;
    }, {
        token: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        clientId: import("convex/values").VString<string, "required">;
        sessionId: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        userId: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        referenceId: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        refreshId: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        expiresAt: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
        createdAt: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
        scopes: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">;
    }, "required", "scopes" | "createdAt" | "userId" | "expiresAt" | "token" | "sessionId" | "clientId" | "referenceId" | "refreshId">, {
        token: ["token", "_creationTime"];
        clientId: ["clientId", "_creationTime"];
        sessionId: ["sessionId", "_creationTime"];
        userId: ["userId", "_creationTime"];
        refreshId: ["refreshId", "_creationTime"];
        referenceId: ["referenceId", "_creationTime"];
    }, {}, {}>;
    oauthConsent: import("convex/server").TableDefinition<import("convex/values").VObject<{
        createdAt?: number | null | undefined;
        updatedAt?: number | null | undefined;
        userId?: string | null | undefined;
        referenceId?: string | null | undefined;
        scopes: string[];
        clientId: string;
    }, {
        clientId: import("convex/values").VString<string, "required">;
        userId: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        referenceId: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VString<string, "required">], "optional", never>;
        scopes: import("convex/values").VArray<string[], import("convex/values").VString<string, "required">, "required">;
        createdAt: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
        updatedAt: import("convex/values").VUnion<number | null | undefined, [import("convex/values").VNull<null, "required">, import("convex/values").VFloat64<number, "required">], "optional", never>;
    }, "required", "scopes" | "createdAt" | "updatedAt" | "userId" | "clientId" | "referenceId">, {
        clientId_userId: ["clientId", "userId", "_creationTime"];
        clientId_userId_referenceId: ["clientId", "userId", "referenceId", "_creationTime"];
        userId: ["userId", "_creationTime"];
        referenceId: ["referenceId", "_creationTime"];
    }, {}, {}>;
    rateLimit: import("convex/server").TableDefinition<import("convex/values").VObject<{
        key: string;
        count: number;
        lastRequest: number;
    }, {
        key: import("convex/values").VString<string, "required">;
        count: import("convex/values").VFloat64<number, "required">;
        lastRequest: import("convex/values").VFloat64<number, "required">;
    }, "required", "key" | "count" | "lastRequest">, {
        key: ["key", "_creationTime"];
    }, {}, {}>;
}, true>;
export default schema;
//# sourceMappingURL=schema.profile-additional-fields.d.ts.map