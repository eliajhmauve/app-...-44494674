import { useState } from "react";
import { NUMBER_MEANINGS, PYRAMID_POSITIONS } from "@/data/numerologyData";

interface PyramidCell {
  key: string;
  value: number | null;
}

interface LifePyramidProps {
  initialValues?: Record<string, number | null>;
}

const LifePyramid = ({ initialValues }: LifePyramidProps) => {
  const [values, setValues] = useState<Record<string, number | null>>(
    initialValues || { M: null, N: null, O: null, P: null, Q: null, R: null }
  );
  const [selected, setSelected] = useState<string | null>(null);

  const updateValue = (key: string, v: string) => {
    const n = parseInt(v);
    setValues(prev => ({ ...prev, [key]: isNaN(n) ? null : n }));
  };

  const getColor = (key: string) => {
    const colors: Record<string, string> = {
      M: "hsl(var(--primary))",
      N: "hsl(var(--secondary))",
      O: "hsl(var(--accent))",
      P: "hsl(var(--primary)/0.7)",
      Q: "hsl(var(--secondary)/0.7)",
      R: "hsl(var(--cosmic-violet))",
    };
    return colors[key] || "hsl(var(--primary))";
  };

  const selectedData = selected
    ? {
        pos: PYRAMID_POSITIONS[selected],
        meaning: values[selected] ? NUMBER_MEANINGS[values[selected]!] : null,
      }
    : null;

  const PyramidCell = ({ k, wide = false }: { k: string; wide?: boolean }) => (
    <div
      className={`relative flex flex-col items-center justify-center border-2 cursor-pointer transition-all duration-200 ${wide ? "py-3 px-6" : "py-4 px-4"} ${
        selected === k ? "scale-105" : ""
      }`}
      style={{
        borderColor: selected === k ? getColor(k) : `${getColor(k).replace(")", " / 0.4)")}`,
        background: selected === k ? `${getColor(k).replace(")", " / 0.15)")}` : `${getColor(k).replace(")", " / 0.05)")}`,
        boxShadow: selected === k ? `4px 4px 0 ${getColor(k)}` : "none",
      }}
      onClick={() => setSelected(selected === k ? null : k)}
    >
      <div className="cosmic-label text-xs mb-1">{PYRAMID_POSITIONS[k]?.label}</div>
      <input
        type="number"
        min={1}
        max={33}
        value={values[k] ?? ""}
        onChange={e => { e.stopPropagation(); updateValue(k, e.target.value); }}
        onClick={e => e.stopPropagation()}
        placeholder="?"
        className="w-12 h-8 text-center text-base font-bold bg-transparent border-b-2 outline-none"
        style={{
          borderColor: getColor(k),
          color: getColor(k),
          fontFamily: "var(--font-mono)",
        }}
      />
      <div
        className="text-xs mt-1 font-bold"
        style={{ color: getColor(k), fontFamily: "var(--font-mono)" }}
      >
        {PYRAMID_POSITIONS[k]?.sublabel}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="brutal-card p-6 border-2 border-primary/30">
        <div className="cosmic-label mb-2">生命金字塔系統</div>
        <h2 className="section-title text-2xl text-gradient-gold mb-2">生命金字塔</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          金字塔展示你人生各階段的能量結構。點擊任一層級查看詳細解析，輸入數字後可得到該位置的完整能量說明。
        </p>
      </div>

      {/* Pyramid Visual */}
      <div className="brutal-card p-6 border-2 border-primary/20">
        <div className="flex flex-col items-center gap-3 max-w-sm mx-auto">
          {/* Top - R (最終高峰) */}
          <div className="w-32">
            <PyramidCell k="R" />
          </div>
          {/* Second - P & Q */}
          <div className="flex gap-3 w-64">
            <div className="flex-1"><PyramidCell k="P" /></div>
            <div className="flex-1"><PyramidCell k="Q" /></div>
          </div>
          {/* Third - O (主命數) */}
          <div className="w-48">
            <PyramidCell k="O" wide />
          </div>
          {/* Base - M & N */}
          <div className="flex gap-3 w-full">
            <div className="flex-1"><PyramidCell k="M" /></div>
            <div className="flex-1"><PyramidCell k="N" /></div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-border/30 grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(PYRAMID_POSITIONS).map(([k, v]) => (
            <div
              key={k}
              className="flex items-center gap-2 text-xs cursor-pointer p-1"
              onClick={() => setSelected(selected === k ? null : k)}
            >
              <div
                className="w-5 h-5 flex items-center justify-center border text-xs font-bold flex-shrink-0"
                style={{
                  borderColor: getColor(k),
                  color: getColor(k),
                  fontFamily: "var(--font-mono)",
                }}
              >
                {values[k] ?? k}
              </div>
              <span className="text-muted-foreground">{v.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Position Detail */}
      {selected && selectedData && (
        <div
          className="brutal-card p-5 border-2 animate-fade-in space-y-4"
          style={{ borderColor: getColor(selected) + "80" }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 border-2 flex items-center justify-center font-bold flex-shrink-0"
              style={{
                borderColor: getColor(selected),
                color: getColor(selected),
                fontFamily: "var(--font-mono)",
                fontSize: "1.1rem",
              }}
            >
              {selectedData.pos.sublabel}
            </div>
            <div>
              <div style={{ color: getColor(selected) }} className="font-bold">{selectedData.pos.label}</div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{selectedData.pos.description}</p>
            </div>
          </div>

          {selectedData.meaning ? (
            <div className="space-y-3 pt-2 border-t border-border/30">
              <div className="flex items-center gap-3">
                <div
                  className="text-3xl font-bold"
                  style={{ color: getColor(selected), fontFamily: "var(--font-mono)" }}
                >
                  {values[selected]}
                </div>
                <div>
                  <div className="font-bold">{selectedData.meaning.title}</div>
                  <div className="cosmic-label">{selectedData.meaning.element} · {selectedData.meaning.subtitle}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedData.meaning.essence}</p>
              <div className="text-sm italic p-3 border-l-4" style={{ borderColor: getColor(selected), color: getColor(selected) + "cc" }}>
                {selectedData.meaning.quote}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              輸入數字後即可看到此位置的靈數解析 ✦
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LifePyramid;
