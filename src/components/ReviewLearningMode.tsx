import { useState } from "react";
import NumberInputCard from "./NumberInputCard";

const REVIEW_FIELDS = [
  { key: "lifePath", label: "生命靈數 Life Path", accent: "gold" as const, hint: "最重要的人生主題與道路" },
  { key: "birthday", label: "生日數 Birthday", accent: "cyan" as const, hint: "天生的個性與自然氣質" },
  { key: "giftNumber", label: "天賦數 Gift", accent: "gold" as const, hint: "潛在的能力與才華" },
  { key: "personality", label: "人格數 Personality", accent: "magenta" as const, hint: "外在展現給世界的形象" },
  { key: "soulUrge", label: "靈魂數 Soul Urge", accent: "cyan" as const, hint: "內心深處真正的渴望" },
  { key: "expressionNumber", label: "天命數 Expression", accent: "gold" as const, hint: "整體命運能量的核心" },
  { key: "personalYear", label: "個人年數 Personal Year", accent: "magenta" as const, hint: "當前年份的能量主題" },
  { key: "pinnacle1", label: "高峰數一 Pinnacle 1", accent: "cyan" as const, hint: "第一人生階段主題" },
  { key: "pinnacle2", label: "高峰數二 Pinnacle 2", accent: "gold" as const, hint: "第二人生階段主題" },
  { key: "pinnacle3", label: "高峰數三 Pinnacle 3", accent: "magenta" as const, hint: "第三人生階段主題" },
  { key: "challenge1", label: "挑戰數一 Challenge 1", accent: "magenta" as const, hint: "第一人生功課" },
  { key: "challenge2", label: "挑戰數二 Challenge 2", accent: "cyan" as const, hint: "第二人生功課" },
];

const ReviewLearningMode = () => {
  const [numbers, setNumbers] = useState<Record<string, number | null>>({});
  const [activeFilter, setActiveFilter] = useState<"all" | "filled">("all");

  const handleNumberChange = (key: string, val: number | null) => {
    setNumbers(prev => ({ ...prev, [key]: val }));
  };

  const filledCount = Object.values(numbers).filter(v => v !== null).length;
  const displayFields = activeFilter === "filled"
    ? REVIEW_FIELDS.filter(f => numbers[f.key] !== null && numbers[f.key] !== undefined)
    : REVIEW_FIELDS;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="brutal-card p-6 border-2 border-secondary/40">
        <div className="cosmic-label mb-2">模式二</div>
        <h2 className="section-title text-2xl mb-2" style={{ color: "hsl(var(--secondary))" }}>
          復盤學習模式
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          自行輸入每個靈數，逐一解析它的宇宙能量。這是最深度的靈數學習方式——讓數字帶領你走入自己的靈魂藍圖。
        </p>
      </div>

      {/* Progress */}
      <div className="brutal-card p-4 border-2 border-border flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <span className="cosmic-label">靈魂解析進度</span>
            <span className="cosmic-label" style={{ color: "hsl(var(--primary))" }}>
              {filledCount} / {REVIEW_FIELDS.length}
            </span>
          </div>
          <div className="h-2 bg-muted overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${(filledCount / REVIEW_FIELDS.length) * 100}%`,
                background: "var(--gradient-energy)",
              }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className={activeFilter === "all" ? "btn-cosmic text-xs px-3 py-1.5" : "btn-cosmic-cyan text-xs px-3 py-1.5"}
            onClick={() => setActiveFilter("all")}
          >
            全部
          </button>
          <button
            className={activeFilter === "filled" ? "btn-cosmic text-xs px-3 py-1.5" : "btn-cosmic-cyan text-xs px-3 py-1.5"}
            onClick={() => setActiveFilter("filled")}
            disabled={filledCount === 0}
          >
            已填
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div
        className="p-4 border border-primary/20 bg-primary/5 text-sm text-muted-foreground leading-relaxed"
        style={{ borderLeft: "4px solid hsl(var(--primary))" }}
      >
        <span className="text-primary font-bold">◈ 使用方式：</span>
        在每個欄位輸入對應的靈數（1-9 或主數 11、22、33），按下「解析」按鈕即可看到完整的能量說明與靈魂功課。
        輸入越多，你的生命藍圖就越清晰。
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayFields.map(({ key, label, accent, hint }) => (
          <div key={key} className="space-y-1">
            <div className="cosmic-label text-xs opacity-60 pl-1">{hint}</div>
            <NumberInputCard
              key={key}
              label={label}
              typeKey={key}
              colorAccent={accent}
              onNumberChange={(val) => handleNumberChange(key, val)}
              initialValue={numbers[key] ?? null}
            />
          </div>
        ))}
      </div>

      {filledCount === 0 && activeFilter === "filled" && (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-4xl mb-3" style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--primary)/0.3)" }}>?</div>
          <p>尚未輸入任何靈數</p>
          <p className="text-xs mt-1">切換回「全部」開始填入</p>
        </div>
      )}
    </div>
  );
};

export default ReviewLearningMode;
