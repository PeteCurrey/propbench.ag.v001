import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Prop Trading Risk Calculators";
    const subtitle = searchParams.get("subtitle") || "Benchmark firm rules & drawdown floors";
    const firm = searchParams.get("firm") || "PropBench";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#0B0E14",
            backgroundImage: "radial-gradient(circle at 25px 25px, #161B26 2px, transparent 0)",
            backgroundSize: "50px 50px",
            padding: "60px 80px",
            fontFamily: "sans-serif",
            color: "#F3F4F6",
          }}
        >
          {/* Brand Mark Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "#2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              PB
            </div>
            <span style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "1px", color: "#9CA3AF" }}>
              PROPBENCH
            </span>
          </div>

          {/* Title & Subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#2563EB",
                fontWeight: "bold",
              }}
            >
              {firm} • Verification Layer
            </div>
            <div style={{ fontSize: "52px", fontWeight: "800", lineHeight: "1.1", color: "#FFFFFF" }}>
              {title}
            </div>
            <div style={{ fontSize: "22px", color: "#9CA3AF", maxWidth: "800px" }}>
              {subtitle}
            </div>
          </div>

          {/* Footer Bar */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #1F2937",
              paddingTop: "24px",
              fontSize: "16px",
              color: "#6B7280",
            }}
          >
            <span>https://propbench.com</span>
            <span>Pure Calculation Engine</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
