import { useState } from "react";
import { NUMBER_MEANINGS } from "@/data/numerologyData";

// Nine Grid Layout: positions of numbers 1-9 in traditional numerology grid
// Row 1: 3, 6, 9
// Row 2: 2, 5, 8
// Row 3: 1, 4, 7
const GRID_LAYOUT = [
  [3, 6, 9],
  [2, 5, 8],
  [1, 4, 7],
];

const GRID_DESCRIPTIONS: Record<number, string> = {
  1: "個人意志 · 獨立",
  2: "直覺 · 敏感",
  3: "創意 · 表達",
  4: "穩定 · 務實",
  5: "溝通 · 自由",
  6: "愛 · 責任",
  7: "智慧 · 靈性",
  8: "豐盛 · 成就",
  9: "慈悲 · 完成",
};

interface NineGridProps {
  initialCounts?: Record<number, number>;
  birthdate?: string;
}

const NineGrid = ({ initialCounts, birthdate }: NineGridProps) => {
  const [birthdateInput, setBirthdateInput] = useState(birthdate || "");
  const [counts, setCounts] = useState<Record<number, number>>(initialCounts || {});
  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  const [manualMode, setManualMode] = useState(!initialCounts);
  const [manualInputs, setManualInputs] = useState<Record<number, string>>({});

  const parseFromBirthdate = (bd: string) => {
    const digits = bd.replace(/[^0-9]/g, "").split("").map(Number).filter(d => d > 0);
    const c: Record<number, number> = {};
    digits.forEach(d => { c[d] = (c[d] || 0) + 1; });
    setCounts(c);
    setManualMode(false);
  };

  const applyManualInputs = () => {
    const c: Record<number, number> = {};
    Object.entries(manualInputs).forEach(([k, v]) => {
      const num = parseInt(k);
      const count = parseInt(v);
      if (!isNaN(count) && count > 0) c[num] = count;
    });
    setCounts(c);
  };

  const presentNums = new Set(Object.keys(counts).map(Number));
  const missingNums = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => !presentNums.has(n));
  const meaning = selectedNum ? NUMBER_MEANINGS[selectedNum] : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="brutal-card p-6 border-2 border-secondary/40">
        <div className="cosmic-label mb-2">九宮格生命數字圖</div>
        <h2 className="section-title text-2xl mb-2" style={{ color: "hsl(var(--secondary))" }}>
          九宮格能量圖
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          透過生日中出現的數字，了解你的能量分布。出現的數字代表你的天賦能量，缺少的數字是你的靈魂功課。
        </p>
      </div>

      {/* Input Mode Toggle */}
      <div className="brutal-card p-4 border-2 border-border space-y-4">
        <div className="flex gap-2">
          <button
            className={!manualMode ? "btn-cosmic text-xs px-3 py-2" : "btn-cosmic-cyan text-xs px-3 py-2"}
            onClick={() => setManualMode(false)}
          >
            從生日日期計算
          </button>
          <button
            className={manualMode ? "btn-cosmic text-xs px-3 py-2" : "btn-cosmic-cyan text-xs px-3 py-2"}
            onClick={() => setManualMode(true)}
          >
            手動輸入
          </button>
        </div>

        {!manualMode ? (
          <div className="flex gap-3">
            <input
              className="cosmic-input flex-1"
              placeholder="輸入生日日期，例如：19901225"
              value={birthdateInput}
              onChange={e => setBirthdateInput(e.target.value)}
            />
            <button className="btn-cosmic px-4" onClick={() => parseFromBirthdate(birthdateInput)}>
              解析
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="cosmic-label">手動輸入各數字出現次數 (0=未出現)</div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                <div key={n} className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 flex items-center justify-center border text-sm font-bold flex-shrink-0"
                    style={{
                      borderColor: "hsl(var(--primary)/0.5)",
                      color: "hsl(var(--primary))",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {n}
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={9}
                    placeholder="0"
                    value={manualInputs[n] || ""}
                    onChange={e => setManualInputs(prev => ({ ...prev, [n]: e.target.value }))}
                    className="cosmic-input w-full py-1 text-center"
                  />
                </div>
              ))}
            </div>
            <button className="btn-cosmic w-full py-2" onClick={applyManualInputs}>
              顯示九宮格
            </button>
          </div>
        )}
      </div>

      {/* Nine Grid Display */}
      {(Object.keys(counts).length > 0 || Object.values(counts).some(v => v > 0)) && (
        <div className="space-y-4">
          <div className="brutal-card p-4 border-2 border-secondary/30">
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              {GRID_LAYOUT.map((row, ri) =>
                row.map((num) => {
                  const count = counts[num] || 0;
                  const isPresent = count > 0;
                  const isSelected = selectedNum === num;
                  return (
                    <div
                      key={num}
                      className={`nine-grid-cell cursor-pointer ${isPresent ? "has-number" : "missing"} ${isSelected ? "scale-105" : ""}`}
                      style={{
                        minHeight: "70px",
                        borderColor: isSelected
                          ? "hsl(var(--secondary))"
                          : isPresent
                          ? "hsl(var(--primary)/0.7)"
                          : "hsl(var(--accent)/0.3)",
                        background: isSelected
                          ? "hsl(var(--secondary)/0.2)"
                          : isPresent
                          ? "hsl(var(--primary)/0.1)"
                          : "hsl(var(--accent)/0.05)",
                        boxShadow: isSelected ? "4px 4px 0 hsl(var(--secondary))" : "none",
                      }}
                      onClick={() => setSelectedNum(selectedNum === num ? null : num)}
                    >
                      <div className="text-center">
                        <div
                          className="text-2xl font-bold"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: isPresent ? "hsl(var(--primary))" : "hsl(var(--accent)/0.4)",
                          }}
                        >
                          {num}
                        </div>
                        {isPresent && count > 1 && (
                          <div
                            className="text-xs"
                            style={{ color: "hsl(var(--secondary))", fontFamily: "var(--font-mono)" }}
                          >
                            ×{count}
                          </div>
                        )}
                        {!isPresent && (
                          <div className="text-xs" style={{ color: "hsl(var(--accent)/0.3)" }}>缺</div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Missing Numbers */}
          {missingNums.length > 0 && (
            <div className="brutal-card-magenta p-4 space-y-2">
              <div className="cosmic-label text-accent">缺失數字 — 靈魂功課</div>
              <div className="flex flex-wrap gap-2">
                {missingNums.map(n => (
                  <div
                    key={n}
                    className="flex items-center gap-2 px-3 py-1 border cursor-pointer"
                    style={{
                      borderColor: "hsl(var(--accent)/0.5)",
                      background: "hsl(var(--accent)/0.08)",
                    }}
                    onClick={() => setSelectedNum(selectedNum === n ? null : n)}
                  >
                    <span
                      className="font-bold text-sm"
                      style={{ color: "hsl(var(--accent))", fontFamily: "var(--font-mono)" }}
                    >
                      {n}
                    </span>
                    <span className="text-xs text-muted-foreground">{GRID_DESCRIPTIONS[n]}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic mt-2">
                缺失的數字是這一世需要特別發展的能量面向，是靈魂特意帶來的學習功課。
              </p>
            </div>
          )}

          {/* Selected Number Detail */}
          {selectedNum && meaning && (
            <div className="brutal-card p-5 border-2 border-secondary/50 animate-fade-in space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="text-4xl font-bold"
                  style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--secondary))" }}
                >
                  {selectedNum}
                </div>
                <div>
                  <div className="font-bold text-lg">{meaning.title}</div>
                  <div className="cosmic-label">{meaning.element} · {meaning.subtitle}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{GRID_DESCRIPTIONS[selectedNum]}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="cosmic-label mb-1">出現次數</div>
                  <div
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: counts[selectedNum] ? "hsl(var(--primary))" : "hsl(var(--accent))",
                    }}
                  >
                    {counts[selectedNum] || "缺"}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{meaning.essence}</p>
              {counts[selectedNum] ? (
                <div>
                  <div className="cosmic-label mb-2">此數字強化的能量</div>
                  <div className="flex flex-wrap gap-1.5">
                    {meaning.strengths.map((s, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 border"
                        style={{
                          borderColor: "hsl(var(--secondary)/0.4)",
                          color: "hsl(var(--secondary)/0.8)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="cosmic-label mb-2 text-accent">缺失此數字的靈魂功課</div>
                  <div className="flex flex-wrap gap-1.5">
                    {meaning.challenges.map((c, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 border"
                        style={{
                          borderColor: "hsl(var(--accent)/0.4)",
                          color: "hsl(var(--accent)/0.8)",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div
                className="text-sm italic p-3 border-l-4"
                style={{
                  borderColor: "hsl(var(--secondary))",
                  color: "hsl(var(--secondary)/0.8)",
                  background: "hsl(var(--secondary)/0.05)",
                }}
              >
                {meaning.quote}
              </div>
            </div>
          )}
        </div>
      )}

      {Object.keys(counts).length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <div
            className="text-6xl mb-4 opacity-20"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--secondary))" }}
          >
            九宮格
          </div>
          <p>請輸入生日日期或手動輸入數字</p>
          <p className="text-xs mt-1">生命的數字分布正在等待被揭示</p>
        </div>
      )}
    </div>
  );
};

export default NineGrid;
