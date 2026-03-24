// This is a simple server-side event emitter for SSE
// In a persistent container environment like this, a global variable works.

const globalForEvents = global as unknown as {
    studyEmitter: EventTarget | undefined;
};

export const studyEmitter = globalForEvents.studyEmitter ?? new EventTarget();

if (process.env.NODE_ENV !== "production") globalForEvents.studyEmitter = studyEmitter;

export function emitStudyEvent(data: any) {
    studyEmitter.dispatchEvent(new CustomEvent("new-study", { detail: data }));
}
