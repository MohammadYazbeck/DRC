import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import { getCmsContent, getJobApplications, saveJobApplication } from "@/lib/cms-store";
import { saveUpload } from "@/lib/upload-store";
import type { JobApplication } from "@/lib/cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorizedResponse();
  }

  const applications = await getJobApplications();
  return NextResponse.json(applications);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const jobId = String(formData.get("jobId") ?? "");
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const resume = formData.get("resume");

    if (!jobId || !name || !email) {
      return NextResponse.json({ error: "Job, name, and email are required." }, { status: 400 });
    }

    const content = await getCmsContent();
    const job = content.jobs.find((item) => item.id === jobId && item.active);

    if (!job) {
      return NextResponse.json({ error: "Selected job is not available." }, { status: 404 });
    }

    const resumeUrl = resume instanceof File && resume.size > 0
      ? await saveUpload(resume, "applications")
      : undefined;

    const application: JobApplication = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: job.title.en,
      name,
      email,
      phone,
      message,
      resumeUrl,
      createdAt: new Date().toISOString()
    };

    await saveJobApplication(application);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit application.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
