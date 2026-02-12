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

  const wrappedCode = code ? `<>${code}</>` : `<Container padding="md"><Card title="Welcome"><Button variant="primary">Get started by describing a UI in the chat</Button></Card></Container>`;

  return (
    <div className="flex flex-col h-full bg-[#FFFFF8]">
      {/* Tab Bar */}
      <div className="flex items-center justify-between h-11 px-3 border-b border-[#E8E3DB]">
        {/* Segmented Control */}
        <div className="flex items-center gap-0.5 bg-[#F0ECE4] p-0.5 rounded-lg">
          <button
            onClick={() => setActiveTab("preview")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-[12px] font-medium rounded-md transition-all duration-150 cursor-pointer ${
              activeTab === "preview"
                ? "bg-[#FFFFF8] text-[#2D2B26] shadow-sm"
                : "text-[#8C8780] hover:text-[#5C5850]"
            }`}
          >
            <Eye size={12} />
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-[12px] font-medium rounded-md transition-all duration-150 cursor-pointer ${
              activeTab === "code"
                ? "bg-[#FFFFF8] text-[#2D2B26] shadow-sm"
                : "text-[#8C8780] hover:text-[#5C5850]"
            }`}
          >
            <Code size={12} />
            Code
          </button>
        </div>

        {/* Copy */}
        {activeTab === "code" && code && (
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#B5AFA5] hover:text-[#5C5850] transition-colors cursor-pointer"
          >
            {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <LiveProvider code={wrappedCode} scope={scope} noInline={false}>
          {activeTab === "preview" ? (
            <div className="p-6 min-h-full">
              <LivePreview />
              <LiveError className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-[12px] text-red-600 font-mono" />
            </div>
          ) : (
            <div className="p-4">
              <pre className="bg-[#2D2B26] text-[#F0ECE4] rounded-xl p-5 text-[12px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
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
