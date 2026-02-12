import React, { useState } from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import { ComponentRegistry } from "./ui";
import { Eye, Code, Copy, Check } from "lucide-react";

interface PreviewPanelProps {
  code: string;
}

const PreviewPanel = ({ code }: PreviewPanelProps) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scope = { ...ComponentRegistry, React };

  // Wrap the code in a render expression for react-live
  const wrappedCode = code ? `<>${code}</>` : `<Container padding="md"><Card title="Welcome"><Button variant="primary">Get started by describing a UI in the chat</Button></Card></Container>`;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tab Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("preview")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === "preview"
                ? "bg-white text-teal-700 shadow-sm border border-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Eye size={14} />
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === "code"
                ? "bg-white text-teal-700 shadow-sm border border-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Code size={14} />
            Code
          </button>
        </div>

        {activeTab === "code" && code && (
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <LiveProvider code={wrappedCode} scope={scope} noInline={false}>
          {activeTab === "preview" ? (
            <div className="p-4 min-h-full">
              <LivePreview />
              <LiveError className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-mono" />
            </div>
          ) : (
            <div className="p-4">
              <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-sm font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {code || "// No code generated yet"}
              </pre>
            </div>
          )}
        </LiveProvider>
      </div>
    </div>
  );
};

export default PreviewPanel;
