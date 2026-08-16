import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import { getCmsContent, saveCmsContent } from "@/lib/cms-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getCmsContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const content = await saveCmsContent(body);
    return NextResponse.json(content);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save CMS content.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
