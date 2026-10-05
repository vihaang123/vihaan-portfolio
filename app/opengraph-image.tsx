import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, site } from "@/lib/content";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const font = await readFile(join(process.cwd(), "app/fonts/Geist-600-OG.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f6f1",
          color: "#0b0b0b",
          padding: 72,
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 2 }}>
          <span>VIHAAN GANDHI</span>
          <span style={{ color: "#63635e" }}>MUMBAI, INDIA</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 128, lineHeight: 0.92, letterSpacing: -5 }}>
          {hero.lines.wide.map((row) => (
            <span key={row} style={{ display: "flex" }}>
              {row.endsWith(".") ? row.slice(0, -1) : row}
              {row.endsWith(".") && <span style={{ color: "#1e3cff" }}>.</span>}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 26, color: "#63635e", letterSpacing: 2 }}>DATA SCIENCE · AI · PRODUCT</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: font, weight: 600, style: "normal" }] },
  );
}
