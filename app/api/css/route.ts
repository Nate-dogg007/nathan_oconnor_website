import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const cssPath = path.join(process.cwd(), "app", "globals.css")
    const cssContent = fs.readFileSync(cssPath, "utf8")

    return new NextResponse(cssContent, {
      headers: {
        "Content-Type": "text/css",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    return new NextResponse("/* CSS not found */", {
      status: 404,
      headers: {
        "Content-Type": "text/css",
      },
    })
  }
}
