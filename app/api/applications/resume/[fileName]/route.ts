import { readFile } from "fs/promises";
import path from "path";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import { applicationUploadPath, contentTypeForFileName } from "@/lib/upload-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ResumeRouteProps = {
  params: Promise<{ fileName: string }>;
};

export async function GET(request: NextRequest, { params }: ResumeRouteProps) {
  if (!isAdminRequest(request)) {
    return unauthorizedResponse();
  }

  const { fileName } = await params;
  const safeName = path.basename(fileName);

  if (safeName !== fileName) {
    return NextResponse.json({ error: "Invalid file name." }, { status: 400 });
  }

  try {
    const file = await readFile(applicationUploadPath(safeName));
    return new NextResponse(file, {
      headers: {
        "content-type": contentTypeForFileName(safeName),
        "content-disposition": `attachment; filename="${safeName.replace(/"/g, "")}"`,
        "cache-control": "private, no-store"
      }
    });
  } catch {
    return NextResponse.json({ error: "Resume file not found." }, { status: 404 });
  }
}
