import { publicEnv } from "@/lib/env";
import { site } from "@/lib/site";

const MAX_BYTES = 4_000_000;
const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
]);

type PinataUpload = {
  data?: { cid?: string };
  error?: string;
};

export async function GET() {
  return Response.json({ configured: Boolean(process.env.PINATA_JWT?.trim()) });
}

export async function POST(request: Request) {
  const jwt = process.env.PINATA_JWT?.trim();
  if (!jwt) {
    return Response.json({ error: "Pinata is not configured" }, { status: 503 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return Response.json({ error: "Add a coin image" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return Response.json(
        { error: "Use a PNG, JPEG, WebP, or GIF" },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return Response.json(
        { error: "Image must be 4 MB or smaller" },
        { status: 400 },
      );
    }

    const imageCid = await uploadToPinata(jwt, file);
    const metadata = {
      name: site.name,
      symbol: site.ticker,
      description: site.description,
      image: `https://ipfs.io/ipfs/${imageCid}`,
      showName: true,
      createdOn: "https://pump.fun",
      twitter: site.xUrl,
      telegram: site.telegramUrl,
      website: publicEnv.appUrl,
    };
    const metadataFile = new File([JSON.stringify(metadata)], "metadata.json", {
      type: "application/json",
    });
    const metadataCid = await uploadToPinata(jwt, metadataFile);
    return Response.json({ uri: `https://ipfs.io/ipfs/${metadataCid}` });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Metadata upload failed";
    return Response.json({ error: message }, { status: 502 });
  }
}

async function uploadToPinata(jwt: string, file: File): Promise<string> {
  const body = new FormData();
  body.append("network", "public");
  body.append("file", file);

  const response = await fetch("https://uploads.pinata.cloud/v3/files", {
    method: "POST",
    headers: { Authorization: `Bearer ${jwt}` },
    body,
  });
  const payload = (await response.json()) as PinataUpload;
  const cid = payload.data?.cid;
  if (!response.ok || !cid) {
    throw new Error(payload.error || "Pinata upload failed");
  }
  return cid;
}
