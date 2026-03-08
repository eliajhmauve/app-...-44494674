import { useState } from "react";
import { NUMBER_MEANINGS, getNumerologyInterpretation } from "@/data/numerologyData";

interface NumberInputCardProps {
  label: string;
  typeKey: string;
  colorAccent?: "gold" | "cyan" | "magenta";
  onNumberChange?: (n: number | null) => void;
  initialValue?: number | null;
  readonly?: boolean;
  readonlyValue?: number | null;
}

const NumberInputCard = ({
  label,
  typeKey,
  colorAccent = "gold",
  onNumberChange,
  initialValue = null,
  readonly = false,
  readonlyValue = null,
}: NumberInputCardProps) => {
  const [inputVal, setInputVal] = useState(initialValue !== null ? String(initialValue) : "");
  const [showDetail, setShowDetail] = useState(false);

  const displayNum = readonly
    ? readonlyValue
    : inputVal !== "" && !isNaN(Number(inputVal))
    ? Number(inputVal)
    : null;

  const meaning = displayNum !== null ? NUMBER_MEANINGS[displayNum] : null;
  const interpretation = displayNum !== null ? getNumerologyInterpretation(typeKey, displayNum) : "";

  const accentColor = {
    gold: "border-primary/50 shadow-brutal-sm",
    cyan: "border-secondary/50 shadow-brutal-cyan",
    magenta: "border-accent/50 shadow-brutal-magenta",
  }[colorAccent];

  const numBadgeColor = {
    gold: "border-primary bg-primary/10 text-primary",
    cyan: "border-secondary bg-secondary/10 text-secondary",
    magenta: "border-accent bg-accent/10 text-accent",
  }[colorAccent];

  const btnColor = {
    gold: "btn-cosmic",
    cyan: "btn-cosmic-cyan",
    magenta: "btn-cosmic-magenta",
  }[colorAccent];

  return (
    <div className={`brutal-card border-2 ${accentColor} p-4 space-y-3`}>
      <div className="flex items-center gap-3">
        {/* Number Badge or Input */}
        {readonly ? (
          <div className={`number-badge ${numBadgeColor}`}>
            {displayNum ?? "—"}
          </div>
        ) : (
          <input
            type="number"
            min={1}
            max={33}
            value={inputVal}
            onChange={(e) => {
              const v = e.target.value;
              setInputVal(v);
              const n = parseInt(v);
              if (!isNaN(n) && n >= 1 && n <= 33) onNumberChange?.(n);
              else if (v === "") onNumberChange?.(null);
            }}
            placeholder="?"
            className={`w-12 h-12 text-center text-lg font-bold border-2 bg-muted/50 outline-none ${
              colorAccent === "gold"
                ? "border-primary/50 text-primary focus:border-primary"
                : colorAccent === "cyan"
                ? "border-secondary/50 text-secondary focus:border-secondary"
                : "border-accent/50 text-accent focus:border-accent"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          />
        )}

        {/* Label */}
        <div className="flex-1">
          <div className="cosmic-label">{label}</div>
          {meaning && (
            <div
              className="text-sm font-bold mt-0.5"
              style={{
                color:
                  colorAccent === "gold"
                    ? "hsl(var(--primary))"
                    : colorAccent === "cyan"
                    ? "hsl(var(--secondary))"
                    : "hsl(var(--accent))",
              }}
            >
              {meaning.title} · {meaning.element}
            </div>
          )}
        </div>

        {/* Analyze Button */}
        {displayNum !== null && (
          <button
            className={`${btnColor} text-xs px-3 py-2`}
            onClick={() => setShowDetail(!showDetail)}
          >
            {showDetail ? "收起" : "解析"}
          </button>
        )}
      </div>

      {/* Keywords */}
      {meaning && (
        <div className="flex flex-wrap gap-1.5">
          {meaning.keywords.map((k) => (
            <span
              key={k}
              className="text-xs px-2 py-0.5 border"
              style={{
                borderColor:
                  colorAccent === "gold"
                    ? "hsl(var(--primary)/0.4)"
                    : colorAccent === "cyan"
                    ? "hsl(var(--secondary)/0.4)"
                    : "hsl(var(--accent)/0.4)",
                color:
                  colorAccent === "gold"
                    ? "hsl(var(--primary)/0.8)"
                    : colorAccent === "cyan"
                    ? "hsl(var(--secondary)/0.8)"
                    : "hsl(var(--accent)/0.8)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
              }}
            >
              {k}
            </span>
          ))}
        </div>
      )}

      {/* Detail Panel */}
      {showDetail && meaning && (
        <div
          className="border-t border-border/50 pt-3 space-y-3 animate-fade-in"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">{meaning.essence}</p>

          <div>
            <div className="cosmic-label mb-1">✦ 核心能量</div>
            <p className="text-sm leading-relaxed">{interpretation}</p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div>
              <div className="cosmic-label mb-1">▲ 優勢天賦</div>
              <ul className="text-sm space-y-0.5">
                {meaning.strengths.map((s, i) => (
                  <li key={i} className="text-muted-foreground">
                    <span
                      style={{
                        color:
                          colorAccent === "gold"
                            ? "hsl(var(--primary))"
                            : colorAccent === "cyan"
                            ? "hsl(var(--secondary))"
                            : "hsl(var(--accent))",
                      }}
                    >
                      ◆{" "}
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="cosmic-label mb-1">◎ 靈魂功課</div>
              <ul className="text-sm space-y-0.5">
                {meaning.challenges.map((c, i) => (
                  <li key={i} className="text-muted-foreground">
                    <span className="text-accent/60">◆ </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="p-3 border-l-4 text-sm italic"
            style={{
              borderColor:
                colorAccent === "gold"
                  ? "hsl(var(--primary))"
                  : colorAccent === "cyan"
                  ? "hsl(var(--secondary))"
                  : "hsl(var(--accent))",
              color:
                colorAccent === "gold"
                  ? "hsl(var(--primary)/0.8)"
                  : colorAccent === "cyan"
                  ? "hsl(var(--secondary)/0.8)"
                  : "hsl(var(--accent)/0.8)",
              background:
                colorAccent === "gold"
                  ? "hsl(var(--primary)/0.05)"
                  : colorAccent === "cyan"
                  ? "hsl(var(--secondary)/0.05)"
                  : "hsl(var(--accent)/0.05)",
            }}
          >
            {meaning.quote}
          </div>

          <div>
            <div className="cosmic-label mb-1">◈ 人生功課</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{meaning.lifeLesson}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberInputCard;
