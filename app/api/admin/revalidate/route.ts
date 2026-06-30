import {NextResponse, type NextRequest} from "next/server";
import {revalidatePath} from "next/cache";
import {auth} from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  // Revalidate all public-facing pages
  revalidatePath("/", "layout"); // clears everything under /

  return NextResponse.json({success: true, revalidated: true});
}
