import type { CodeVersion } from "../types";
import { RotateCcw } from "lucide-react";

interface VersionHistoryProps {
  versions: CodeVersion[];
  currentIndex: number;
  onRollback: (index: number) => void;
  onClear: () => void;
}

const VersionHistory = ({
  versions,
  currentIndex,
  onRollback,
  onClear,
}: VersionHistoryProps) => {
  if (versions.length === 0) return null;

  return (
    <div className="flex flex-col border-t border-[#E8E3DB]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-[#5C5850] tracking-[-0.01em]">
            History
          </span>
          <span className="text-[10px] font-medium text-[#A39E93] bg-[#F0ECE4] px-1.5 py-0.5 rounded-md min-w-[20px] text-center">
            {versions.length}
          </span>
        </div>
        <button
          onClick={onClear}
          className="text-[11px] font-medium text-[#B5AFA5] hover:text-[#EF4444] transition-colors cursor-pointer"
        >
          Clear
        </button>
      </div>

      {/* Version List */}
      <div className="overflow-y-auto max-h-40">
        {versions.map((version, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={version.id}
              className={`group flex items-center justify-between px-5 py-2 text-[12px] border-t border-[#F0ECE4] transition-colors ${
                isActive
                  ? "bg-[#F5F0E8]"
                  : "hover:bg-[#F5F0E8]/50"
              }`}
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className={`w-0.5 h-5 rounded-full flex-shrink-0 ${isActive ? "bg-[#D4A27F]" : "bg-transparent"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-medium ${isActive ? "text-[#2D2B26]" : "text-[#5C5850]"}`}>
                      v{idx + 1}
                    </span>
                    {isActive && (
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-[#D4A27F] bg-[#F0E0D0] px-1.5 py-px rounded">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-[#B5AFA5] truncate mt-px leading-tight">
                    {version.prompt}
                  </p>
                </div>
              </div>
              {!isActive && (
                <button
                  onClick={() => onRollback(idx)}
                  className="ml-2 p-1 text-[#D5D0C8] opacity-0 group-hover:opacity-100 hover:text-[#D4A27F] rounded transition-all cursor-pointer"
                  title="Restore this version"
                >
                  <RotateCcw size={12} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VersionHistory;
