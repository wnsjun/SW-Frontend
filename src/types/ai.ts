export type AiCoachingResponse =
  | { hasMessage: true; content: string; generatedAt: string }
  | { hasMessage: false; message: string };
