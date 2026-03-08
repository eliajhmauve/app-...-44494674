import { useState } from "react";
import { letterToNumber, calcSoulUrge, calcPersonality, calcExpressionNumber, reduceNumber } from "@/lib/numerology";
import { NUMBER_MEANINGS } from "@/data/numerologyData";

const NameNumerology = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<{
    soulUrge: number;
    personality: number;
    expression: number;
    letterMap: Array<{ char: string; isVowel: boolean; value: number }>;
  } | null>(null);

  const VOWELS = new Set(["A", "E", "I", "O", "U"]);

  const analyze = () => {
    if (!name.trim()) return;
    const upper = name.toUpperCase().replace(/[^A-Z]/g, "");
    const letterMap = upper.split("").map(c => ({
      char: c,
      isVowel: VOWELS.has(c),
      value: letterToNumber(c),
    }));
    setResult({
      soulUrge: calcSoulUrge(name),
      personality: calcPersonality(name),
      expression: calcExpressionNumber(name),
      letterMap,
    });
  };

  const soulMeaning = result ? NUMBER_MEANINGS[result.soulUrge] : null;
  const personalityMeaning = result ? NUMBER_MEANINGS[result.personality] : null;
  const expressionMeaning = result ? NUMBER_MEANINGS[result.expression] : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="brutal-card p-6 border-2 border-accent/40">
        <div className="cosmic-label mb-2">姓名靈數系統</div>
        <h2 className="section-title text-2xl mb-2" style={{ color: "hsl(var(--accent))" }}>
          姓名靈數解析
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          每個字母都攜帶著宇宙的振動頻率。透過分析你英文名字中的母音與子音，揭示靈魂深處的渴望與外在展現的形象。
        </p>
      </div>

      {/* Input */}
      <div className="brutal-card p-5 border-2 border-border space-y-4">
        <div className="cosmic-label">◈ 輸入英文姓名 (護照名或常用英文名)</div>
        <div className="flex gap-3">
          <input
            className="cosmic-input flex-1"
            placeholder="例：WANG XIAO MING"
            value={name}
            onChange={e => setName(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === "Enter" && analyze()}
          />
          <button className="btn-cosmic-magenta px-6" onClick={analyze}>
            解析
          </button>
        </div>
        <div className="text-xs text-muted-foreground">
          ◆ 母音 (A, E, I, O, U) = 靈魂數 · 子音 = 人格數 · 全部字母 = 天命數
        </div>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Letter Breakdown */}
          <div className="brutal-card p-5 border-2 border-accent/30 space-y-4">
            <div className="cosmic-label">字母振動頻率解析</div>
            <div className="flex flex-wrap gap-2">
              {result.letterMap.map((l, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center border-2 px-3 py-2 min-w-[40px]"
                  style={{
                    borderColor: l.isVowel
                      ? "hsl(var(--secondary)/0.7)"
                      : "hsl(var(--accent)/0.5)",
                    background: l.isVowel
                      ? "hsl(var(--secondary)/0.1)"
                      : "hsl(var(--accent)/0.07)",
                  }}
                >
                  <div
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: l.isVowel ? "hsl(var(--secondary))" : "hsl(var(--accent))",
                    }}
                  >
                    {l.char}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: l.isVowel ? "hsl(var(--secondary)/0.7)" : "hsl(var(--accent)/0.7)",
                    }}
                  >
                    {l.value}
                  </div>
                  <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.55rem" }}>
                    {l.isVowel ? "靈" : "格"}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>
                <span style={{ color: "hsl(var(--secondary))" }}>■</span> 母音 = 靈魂數
              </span>
              <span>
                <span style={{ color: "hsl(var(--accent))" }}>■</span> 子音 = 人格數
              </span>
            </div>
          </div>

          {/* Three Numbers Display */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "靈魂數", sub: "Soul Urge", val: result.soulUrge, meaning: soulMeaning, color: "secondary" },
              { label: "人格數", sub: "Personality", val: result.personality, meaning: personalityMeaning, color: "accent" },
              { label: "天命數", sub: "Expression", val: result.expression, meaning: expressionMeaning, color: "gold" },
            ].map(({ label, sub, val, meaning, color }) => (
              <div
                key={sub}
                className="brutal-card p-4 border-2 text-center space-y-2"
                style={{
                  borderColor:
                    color === "secondary"
                      ? "hsl(var(--secondary)/0.5)"
                      : color === "accent"
                      ? "hsl(var(--accent)/0.5)"
                      : "hsl(var(--primary)/0.5)",
                }}
              >
                <div
                  className="text-4xl font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color:
                      color === "secondary"
                        ? "hsl(var(--secondary))"
                        : color === "accent"
                        ? "hsl(var(--accent))"
                        : "hsl(var(--primary))",
                    textShadow:
                      color === "secondary"
                        ? "0 0 20px hsl(var(--secondary)/0.5)"
                        : color === "accent"
                        ? "0 0 20px hsl(var(--accent)/0.5)"
                        : "0 0 20px hsl(var(--primary)/0.5)",
                  }}
                >
                  {val || "—"}
                </div>
                <div className="cosmic-label text-xs">{label}</div>
                <div className="cosmic-label text-xs opacity-50">{sub}</div>
                {meaning && <div className="text-xs font-bold">{meaning.title}</div>}
              </div>
            ))}
          </div>

          {/* Detailed Cards */}
          <div className="space-y-3">
            {soulMeaning && (
              <div className="brutal-card p-5 border-2 border-secondary/40 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="number-badge border-secondary bg-secondary/10 text-secondary">{result.soulUrge}</div>
                  <div>
                    <div className="cosmic-label">靈魂數 Soul Urge — 內在渴望</div>
                    <div className="font-bold" style={{ color: "hsl(var(--secondary))" }}>{soulMeaning.title}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{soulMeaning.soulUrge || soulMeaning.essence}</p>
                <div className="text-sm italic" style={{ color: "hsl(var(--secondary)/0.7)" }}>{soulMeaning.quote}</div>
              </div>
            )}
            {personalityMeaning && (
              <div className="brutal-card p-5 border-2 border-accent/40 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="number-badge border-accent bg-accent/10 text-accent">{result.personality}</div>
                  <div>
                    <div className="cosmic-label">人格數 Personality — 外在形象</div>
                    <div className="font-bold" style={{ color: "hsl(var(--accent))" }}>{personalityMeaning.title}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{personalityMeaning.personality || personalityMeaning.essence}</p>
                <div className="text-sm italic" style={{ color: "hsl(var(--accent)/0.7)" }}>{personalityMeaning.quote}</div>
              </div>
            )}
            {expressionMeaning && (
              <div className="brutal-card p-5 border-2 border-primary/40 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="number-badge">{result.expression}</div>
                  <div>
                    <div className="cosmic-label">天命數 Expression — 命運能量</div>
                    <div className="font-bold text-primary">{expressionMeaning.title}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{expressionMeaning.lifeLesson}</p>
                <div className="text-sm italic text-primary/70">{expressionMeaning.quote}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NameNumerology;
