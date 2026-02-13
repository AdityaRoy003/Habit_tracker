import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://zenquotes.io/api/random", {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`ZenQuotes API responded with status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch quote" },
            { status: 500 }
        );
    }
}
