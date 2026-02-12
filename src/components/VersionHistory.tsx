import type { CodeVersion } from "../types";
import { History, RotateCcw, Trash2 } from "lucide-react";

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
    <div className="flex flex-col border-t border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
          <History size={12} />
          Versions ({versions.length})
        </span>
        <button
          onClick={onClear}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          title="Clear history"
        >
          <Trash2 size={12} />
        </button>
      </div>

      {/* Version List */}
      <div className="overflow-y-auto max-h-40">
        {versions.map((version, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={version.id}
              className={`flex items-center justify-between px-4 py-2 text-xs border-b border-gray-50 transition-colors ${
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">v{idx + 1}</span>
                  {isActive && (
                    <span className="text-[10px] bg-teal-100 text-teal-600 px-1.5 py-0.5 rounded-full font-medium">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-gray-400 truncate mt-0.5">
                  {version.prompt}
                </p>
              </div>
              {!isActive && (
                <button
                  onClick={() => onRollback(idx)}
                  className="ml-2 p-1 text-gray-400 hover:text-teal-600 rounded transition-colors cursor-pointer"
                  title="Rollback to this version"
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
