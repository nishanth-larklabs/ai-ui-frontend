export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export interface CodeVersion {
  id: string;
  code: string;
  blueprint: object | null;
  prompt: string;
  explanation: string;
  timestamp: number;
}

export interface GenerateRequest {
  prompt: string;
  currentCode: string | null;
  currentBlueprint: object | null;
}

export interface GenerateResponse {
  code: string;
  blueprint: object;
  explanation: string;
  violations: string[];
}
