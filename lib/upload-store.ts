import { mkdir, writeFile } from "fs/promises";
import path from "path";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "application/pdf"
]);

function extensionFor(file: File) {
  const fromName = path.extname(file.name).toLowerCase();
  if (fromName) {
    return fromName;
  }

  if (file.type === "image/jpeg") return ".jpg";
  if (file.type === "image/png") return ".png";
  if (file.type === "image/webp") return ".webp";
  if (file.type === "image/svg+xml") return ".svg";
  if (file.type === "application/pdf") return ".pdf";
  return "";
}

function safeBaseName(name: string) {
  return path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60) || "upload";
}

export function applicationUploadPath(fileName: string) {
  const safeName = path.basename(fileName);

  if (safeName !== fileName) {
    throw new Error("Invalid file name.");
  }

  return path.join(process.cwd(), "data", "uploads", "applications", safeName);
}

export function contentTypeForFileName(fileName: string) {
  const extension = path.extname(fileName).toLowerCase();
  if (extension === ".pdf") return "application/pdf";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".png") return "image/png";
  if (extension === ".webp") return "image/webp";
  if (extension === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

export async function saveUpload(file: File, folder: "cms" | "applications") {
  if (!allowedTypes.has(file.type)) {
    throw new Error("Unsupported file type.");
  }

  const maxBytes = folder === "applications" ? 8 * 1024 * 1024 : 12 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error("File is too large.");
  }

  const extension = extensionFor(file);
  const fileName = `${Date.now()}-${safeBaseName(file.name)}${extension}`;
  const isApplicationFile = folder === "applications";
  const relativeDir = isApplicationFile ? "/api/applications/resume" : "/uploads/cms";
  const diskDir = isApplicationFile
    ? path.join(process.cwd(), "data", "uploads", "applications")
    : path.join(process.cwd(), "public", "uploads", "cms");
  await mkdir(diskDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  await writeFile(path.join(diskDir, fileName), Buffer.from(bytes));

  return `${relativeDir}/${fileName}`;
}
