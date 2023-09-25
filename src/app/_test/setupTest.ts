import { loadEnvConfig } from "@next/env";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("next-auth/react", () => {
  const originalModule = vi.importActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: vi.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

loadEnvConfig(process.cwd());
