import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AuthConfig } from "convex/server";

const { oauthProviderMock } = vi.hoisted(() => ({
  oauthProviderMock: vi.fn(() => ({
    endpoints: {
      getOpenIdConfig: vi.fn(),
      getOAuthServerConfig: vi.fn(),
    },
    hooks: { before: [], after: [] },
    schema: {},
  })),
}));

vi.mock("@better-auth/oauth-provider", () => ({
  oauthProvider: oauthProviderMock,
}));

import { convex } from "./index.js";

const authConfig = {
  providers: [{ applicationID: "convex", domain: "https://example.com" }],
} satisfies AuthConfig;

beforeEach(() => {
  oauthProviderMock.mockClear();
});

const getJwtSetCookieMatcher = () => {
  const plugin = convex({ authConfig });
  const afterHooks = plugin.hooks?.after ?? [];
  const matcher = afterHooks.find((hook) => {
    return (
      hook.matcher({
        path: "/sign-in/email",
        context: { session: { id: "s1" } },
      } as unknown as Parameters<typeof hook.matcher>[0]) &&
      !hook.matcher({
        path: "/sign-out",
        context: { session: null },
      } as unknown as Parameters<typeof hook.matcher>[0])
    );
  })?.matcher;
  if (!matcher) {
    throw new Error("Failed to find Convex JWT set-cookie after hook matcher");
  }
  return matcher;
};

describe("convex plugin JWT cookie refresh matcher", () => {
  it("matches update-session", () => {
    const matcher = getJwtSetCookieMatcher();
    type MatcherContext = Parameters<typeof matcher>[0];
    const ctx = {
      path: "/update-session",
      context: { session: { id: "s1" } },
    };
    expect(matcher(ctx as unknown as MatcherContext)).toBe(true);
  });

  it("matches get-session only when a session exists", () => {
    const matcher = getJwtSetCookieMatcher();
    type MatcherContext = Parameters<typeof matcher>[0];
    const withSessionCtx = {
      path: "/get-session",
      context: { session: { id: "s1" } },
    };
    const withoutSessionCtx = {
      path: "/get-session",
      context: { session: null },
    };
    expect(matcher(withSessionCtx as unknown as MatcherContext)).toBe(true);
    expect(matcher(withoutSessionCtx as unknown as MatcherContext)).toBe(false);
  });
});

describe("convex plugin OAuth provider defaults", () => {
  it("defaults loginPage to the non-routable legacy path", () => {
    convex({ authConfig });

    expect(oauthProviderMock.mock.lastCall?.[0].loginPage).toBe("/not-used");
  });

  it("preserves a configured loginPage override", () => {
    const loginPage = "https://app.example.com/sign-in";

    convex({
      authConfig,
      oauthProvider: { loginPage },
    });

    expect(oauthProviderMock.mock.lastCall?.[0].loginPage).toBe(loginPage);
  });
});
