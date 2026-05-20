import {mkdir, writeFile} from "fs/promises";
import path from "path";
import {randomUUID} from "crypto";
import {NextResponse} from "next/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

function safeExtension(file: File) {
  const fromMime = EXTENSION_BY_MIME[file.type];
  if (fromMime) return fromMime;

  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "");
  return extension || "jpg";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({error: "No image file was uploaded."}, {status: 400});
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json({error: "Only JPG, PNG, WEBP, GIF, and SVG images are allowed."}, {status: 400});
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({error: "Image must not be larger than 5MB."}, {status: 400});
    }

    const uploadsDirectory = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDirectory, {recursive: true});

    const extension = safeExtension(file);
    const filename = `${Date.now()}-${randomUUID()}.${extension}`;
    const destination = path.join(uploadsDirectory, filename);
    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(destination, buffer);

    return NextResponse.json({
      url: `/uploads/${filename}`,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Image upload failed", error);
    return NextResponse.json({error: "Image upload failed."}, {status: 500});
  }
}
