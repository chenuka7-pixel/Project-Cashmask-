import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { text } = await generateText({
      model: "inclusionai/ling-3.0-flash-sante-free",
      system: 'You are a helpful assistant named "CashMask".',
      prompt: "Give a two-sentence introduction of yourself.",
    });

    return NextResponse.json({
      message: text,
    });
  } catch (error) {
    console.error("AI error:", error);

    return NextResponse.json(
      {
        error: "AI request failed",
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}