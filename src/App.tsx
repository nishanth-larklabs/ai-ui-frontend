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
      // Add user message
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

        // Create new version
        const newVersion: CodeVersion = {
          id: crypto.randomUUID(),
          code: response.code,
          blueprint: response.blueprint,
          prompt: content,
          explanation: response.explanation,
          timestamp: Date.now(),
        };

        setVersions((prev) => {
          const updated = [...prev, newVersion];
          return updated;
        });
        setCurrentVersionIndex((prev) => {
          // It's the versions.length value before the update
          const newIdx =
            prev >= 0 ? versions.length : 0;
          return newIdx;
        });

        // Add assistant response
        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.explanation,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMsg]);

        // Show violations as system message if any
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
    <div className="h-screen w-screen flex bg-gray-100 overflow-hidden">
      {/* Left Panel — Chat + Version History */}
      <div className="w-[380px] min-w-[320px] flex flex-col border-r border-gray-200 bg-white">
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

      {/* Right Panel — Preview + Code */}
      <div className="flex-1 overflow-hidden">
        <PreviewPanel code={currentVersion?.code || ""} />
      </div>
    </div>
  );
}

export default App;
