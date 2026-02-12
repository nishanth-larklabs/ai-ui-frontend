interface ChartDataPoint {
  label: string;
  value: number;
}

interface ChartProps {
  type?: "bar" | "line" | "pie";
  data?: ChartDataPoint[];
  title?: string;
}

const CHART_COLORS = [
  "#5B8DEF", 
  "#D4A27F", 
  "#4FC4AA", 
  "#E88D67", 
  "#9B8FE8", 
  "#E6C95D", 
  "#E87DA0", 
  "#6BC5D2", 
];

const Chart = ({
  type = "bar",
  data = [],
  title,
}: ChartProps) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {title && (
        <h3 className="text-sm font-semibold text-[#2D2B26] mb-5 tracking-[-0.01em]">
          {title}
        </h3>
      )}

      {/* ── Bar Chart ── */}
      {type === "bar" && (
        <div>
          <div className="flex items-end gap-3 h-44">
            {data.map((point, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end gap-2">
                <span className="text-[11px] font-medium text-[#5C5850]">
                  {point.value}
                </span>
                <div
                  className="w-full rounded-md transition-all min-h-[6px]"
                  style={{
                    height: `${Math.max((point.value / maxValue) * 100, 4)}%`,
                    backgroundColor: CHART_COLORS[idx % CHART_COLORS.length],
                  }}
                />
              </div>
            ))}
            {data.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-[#B5AFA5] text-sm">
                No data
              </div>
            )}
          </div>
          {data.length > 0 && (
            <div className="flex gap-3 mt-2 border-t border-gray-100 pt-2">
              {data.map((point, idx) => (
                <div key={idx} className="flex-1 text-center">
                  <span className="text-[11px] text-[#8C8780] truncate block">
                    {point.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Line Chart ── */}
      {type === "line" && (
        <div>
          <div className="relative" style={{ height: "180px" }}>
            <svg
              viewBox="0 0 200 100"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5B8DEF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#5B8DEF" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((pct) => {
                const y = 85 - (pct / 100) * 70;
                return (
                  <line
                    key={pct}
                    x1="10"
                    y1={y}
                    x2="190"
                    y2={y}
                    stroke="#F0ECE4"
                    strokeWidth="0.4"
                  />
                );
              })}

              {/* Area fill */}
              {data.length > 1 && (
                <polygon
                  fill="url(#lineGrad)"
                  points={`${10 + (0 / (data.length - 1)) * 180},85 ${data
                    .map(
                      (point, idx) =>
                        `${10 + (idx / (data.length - 1)) * 180},${85 - (point.value / maxValue) * 70}`
                    )
                    .join(" ")} ${10 + ((data.length - 1) / (data.length - 1)) * 180},85`}
                />
              )}

              {/* Line */}
              {data.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#5B8DEF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={data
                    .map(
                      (point, idx) =>
                        `${10 + (idx / (data.length - 1)) * 180},${85 - (point.value / maxValue) * 70}`
                    )
                    .join(" ")}
                />
              )}

              {/* Dots + value labels */}
              {data.map((point, idx) => {
                const cx = 10 + (idx / Math.max(data.length - 1, 1)) * 180;
                const cy = 85 - (point.value / maxValue) * 70;
                return (
                  <g key={idx}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r="3.5"
                      fill="white"
                      stroke="#5B8DEF"
                      strokeWidth="2"
                    />
                    <text
                      x={cx}
                      y={cy - 8}
                      textAnchor="middle"
                      fill="#5C5850"
                      fontSize="7"
                      fontWeight="500"
                      fontFamily="Inter, sans-serif"
                    >
                      {point.value}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          {/* X-axis labels */}
          {data.length > 0 && (
            <div className="flex justify-between px-3 -mt-1">
              {data.map((point, idx) => (
                <span key={idx} className="text-[11px] text-[#8C8780]">
                  {point.label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Pie / Donut Chart ── */}
      {type === "pie" && (
        <div className="flex items-center gap-6">
          <div className="relative w-36 h-36 flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              {(() => {
                const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
                let offset = 0;
                return data.map((point, idx) => {
                  const pct = (point.value / total) * 100;
                  const el = (
                    <circle
                      key={idx}
                      r="16"
                      cx="18"
                      cy="18"
                      fill="transparent"
                      stroke={CHART_COLORS[idx % CHART_COLORS.length]}
                      strokeWidth="3.5"
                      strokeDasharray={`${pct} ${100 - pct}`}
                      strokeDashoffset={`${-offset}`}
                    />
                  );
                  offset += pct;
                  return el;
                });
              })()}
              {/* Center hole for donut effect */}
              <circle cx="18" cy="18" r="12" fill="white" />
            </svg>
          </div>
          {/* Legend */}
          {data.length > 0 && (
            <div className="flex flex-col gap-2">
              {data.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                  />
                  <span className="text-[12px] text-[#5C5850]">{point.label}</span>
                  <span className="text-[11px] text-[#B5AFA5] ml-auto">{point.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chart;
