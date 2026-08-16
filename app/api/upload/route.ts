import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import { saveUpload } from "@/lib/upload-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorizedResponse();
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Upload file is required." }, { status: 400 });
    }

    const url = await saveUpload(file, "cms");
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to upload file.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
