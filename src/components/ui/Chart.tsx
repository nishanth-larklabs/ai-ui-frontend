interface ChartDataPoint {
  label: string;
  value: number;
}

interface ChartProps {
  type?: "bar" | "line" | "pie";
  data?: ChartDataPoint[];
  title?: string;
}

const Chart = ({
  type = "bar",
  data = [],
  title,
}: ChartProps) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}

      {type === "bar" && (
        <div className="flex items-end gap-2 h-40">
          {data.map((point, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1 gap-1">
              <div
                className="w-full bg-teal-500 rounded-t-md transition-all min-h-[4px]"
                style={{ height: `${(point.value / maxValue) * 100}%` }}
              />
              <span className="text-xs text-gray-500 truncate w-full text-center">
                {point.label}
              </span>
            </div>
          ))}
          {data.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              No data
            </div>
          )}
        </div>
      )}

      {type === "line" && (
        <div className="h-40 flex items-end">
          <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
            {data.length > 1 && (
              <polyline
                fill="none"
                stroke="#0d9488"
                strokeWidth="1.5"
                points={data
                  .map(
                    (point, idx) =>
                      `${(idx / (data.length - 1)) * 100},${50 - (point.value / maxValue) * 45}`
                  )
                  .join(" ")}
              />
            )}
            {data.map((point, idx) => (
              <circle
                key={idx}
                cx={(idx / Math.max(data.length - 1, 1)) * 100}
                cy={50 - (point.value / maxValue) * 45}
                r="2"
                fill="#0d9488"
              />
            ))}
          </svg>
        </div>
      )}

      {type === "pie" && (
        <div className="h-40 flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90">
              {(() => {
                const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
                let offset = 0;
                const colors = [
                  "#0d9488", "#f43f5e", "#10b981", "#f59e0b",
                  "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6",
                ];
                return data.map((point, idx) => {
                  const pct = (point.value / total) * 100;
                  const el = (
                    <circle
                      key={idx}
                      r="16"
                      cx="16"
                      cy="16"
                      fill="transparent"
                      stroke={colors[idx % colors.length]}
                      strokeWidth="32"
                      strokeDasharray={`${pct} ${100 - pct}`}
                      strokeDashoffset={`${-offset}`}
                    />
                  );
                  offset += pct;
                  return el;
                });
              })()}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
