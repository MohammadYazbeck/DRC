import { NextResponse, type NextRequest } from "next/server";

const developmentPassword = "drc-admin";

export function getAdminPassword() {
  if (process.env.ADMIN_PASSWORD) {
    return process.env.ADMIN_PASSWORD;
  }

  return process.env.NODE_ENV === "production" ? "" : developmentPassword;
}

export function isAdminRequest(request: NextRequest) {
  const configuredPassword = getAdminPassword();
  const password = request.headers.get("x-admin-password");
  return Boolean(configuredPassword && password && password === configuredPassword);
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
