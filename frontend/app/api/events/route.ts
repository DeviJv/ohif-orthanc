import { NextRequest } from "next/server";
import { studyEmitter } from "@/lib/events";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    console.log("SSE: Client connecting...");
    const stream = new ReadableStream({
        start(controller) {
            // Heartbeat listener to keep connection alive
            const heartbeat = setInterval(() => {
                controller.enqueue(": heartbeat\n\n");
            }, 15000);

            const listener = (ev: any) => {
                const data = JSON.stringify(ev.detail);
                console.log("SSE: Sending event to client");
                controller.enqueue(`data: ${data}\n\n`);
            };
            
            studyEmitter.addEventListener("new-study", listener);
            
            req.signal.addEventListener("abort", () => {
                console.log("SSE: Client disconnected");
                clearInterval(heartbeat);
                studyEmitter.removeEventListener("new-study", listener);
                controller.close();
            });
        }
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    });
}
