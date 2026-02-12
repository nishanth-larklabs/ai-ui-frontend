import { useCallback } from "react";
import ChatPanel from "./components/ChatPanel";
import PreviewPanel from "./components/PreviewPanel";
import VersionHistory from "./components/VersionHistory";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { generateUI } from "./services/api";
import type { ChatMessage, CodeVersion } from "./types";
import { useState } from "react";

function App() {
  // Persisted state
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>(
    "ui-gen-messages",
    []
  );
  const [versions, setVersions] = useLocalStorage<CodeVersion[]>(
    "ui-gen-versions",
    []
  );
  const [currentVersionIndex, setCurrentVersionIndex] = useLocalStorage<number>(
    "ui-gen-current-version",
    -1
  );

  // Transient state
  const [isLoading, setIsLoading] = useState(false);

  const currentVersion =
    currentVersionIndex >= 0 && currentVersionIndex < versions.length
      ? versions[currentVersionIndex]
      : null;

  const handleSendMessage = useCallback(
    async (content: string) => {
      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const response = await generateUI({
          prompt: content,
          currentCode: currentVersion?.code || null,
          currentBlueprint: currentVersion?.blueprint || null,
        });

        const newVersion: CodeVersion = {
          id: crypto.randomUUID(),
          code: response.code,
          blueprint: response.blueprint,
          prompt: content,
          explanation: response.explanation,
          timestamp: Date.now(),
        };

        setVersions((prev) => [...prev, newVersion]);
        setCurrentVersionIndex((prev) => {
          const newIdx = prev >= 0 ? versions.length : 0;
          return newIdx;
        });

        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.explanation,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMsg]);

        if (response.violations.length > 0) {
          const violationMsg: ChatMessage = {
            id: crypto.randomUUID(),
            role: "system",
            content: `⚠️ Safety check: ${response.violations.join(" ")}`,
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, violationMsg]);
        }
      } catch (err) {
        const errorMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "system",
          content: `❌ Error: ${err instanceof Error ? err.message : "Something went wrong. Is the backend running?"}`,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [currentVersion, versions.length, setMessages, setVersions, setCurrentVersionIndex]
  );

  const handleRollback = useCallback(
    (index: number) => {
      setCurrentVersionIndex(index);
      const version = versions[index];
      const rollbackMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "system",
        content: `🔄 Rolled back to version ${index + 1}: "${version.prompt}"`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, rollbackMsg]);
    },
    [versions, setCurrentVersionIndex, setMessages]
  );

  const handleClearHistory = useCallback(() => {
    setMessages([]);
    setVersions([]);
    setCurrentVersionIndex(-1);
  }, [setMessages, setVersions, setCurrentVersionIndex]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#FAF9F6]">

      {/* ── Workspace ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left */}
        <div className="w-[420px] min-w-[360px] flex flex-col border-r border-[#E8E3DB] bg-[#FFFFF8]">
          <div className="flex-1 overflow-hidden">
            <ChatPanel
              messages={messages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
            />
          </div>
          <VersionHistory
            versions={versions}
            currentIndex={currentVersionIndex}
            onRollback={handleRollback}
            onClear={handleClearHistory}
          />
        </div>

        {/* Right */}
        <div className="flex-1 overflow-hidden">
          <PreviewPanel code={currentVersion?.code || ""} />
        </div>
      </div>
    </div>
  );
}

export default App;
