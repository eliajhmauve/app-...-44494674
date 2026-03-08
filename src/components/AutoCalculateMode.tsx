import { useState } from "react";
import { calcFullProfile, NumerologyProfile } from "@/lib/numerology";
import NumberInputCard from "./NumberInputCard";

interface AutoCalculateModeProps {
  onProfileGenerated?: (profile: NumerologyProfile, name: string) => void;
}

const NUMBER_FIELDS = [
  { key: "lifePath", label: "生命靈數 Life Path", accent: "gold" as const },
  { key: "birthday", label: "生日數 Birthday", accent: "cyan" as const },
  { key: "giftNumber", label: "天賦數 Gift", accent: "gold" as const },
  { key: "personality", label: "人格數 Personality", accent: "magenta" as const },
  { key: "soulUrge", label: "靈魂數 Soul Urge", accent: "cyan" as const },
  { key: "expressionNumber", label: "天命數 Expression", accent: "gold" as const },
  { key: "personalYear", label: "個人年數 Personal Year", accent: "magenta" as const },
  { key: "chineseNameNumber", label: "姓名能量數", accent: "cyan" as const },
];

const AutoCalculateMode = ({ onProfileGenerated }: AutoCalculateModeProps) => {
  const [chineseName, setChineseName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [profile, setProfile] = useState<NumerologyProfile | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    const y = parseInt(birthYear);
    const m = parseInt(birthMonth);
    const d = parseInt(birthDay);

    if (!chineseName.trim()) { setError("請輸入中文姓名"); return; }
    if (!englishName.trim()) { setError("請輸入英文護照姓名"); return; }
    if (isNaN(y) || y < 1900 || y > 2099) { setError("請輸入正確的出生年份 (1900-2099)"); return; }
    if (isNaN(m) || m < 1 || m > 12) { setError("請輸入正確的出生月份 (1-12)"); return; }
    if (isNaN(d) || d < 1 || d > 31) { setError("請輸入正確的出生日期 (1-31)"); return; }

    const p = calcFullProfile(chineseName, englishName, y, m, d);
    setProfile(p);
    onProfileGenerated?.(p, chineseName);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="brutal-card p-6 border-2 border-primary/40">
        <div className="cosmic-label mb-2">模式一</div>
        <h2 className="section-title text-2xl text-gradient-gold mb-2">自動計算模式</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          輸入你的生命資訊，讓宇宙數字藍圖自動顯現。每一個數字都是靈魂的振動頻率，等待被解讀。
        </p>
      </div>

      {/* Input Form */}
      <div className="brutal-card p-6 border-2 border-border space-y-4">
        <div className="cosmic-label text-xs mb-4">◈ 輸入你的生命資訊</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="cosmic-label block mb-2">中文姓名</label>
            <input
              className="cosmic-input"
              placeholder="例：王小明"
              value={chineseName}
              onChange={e => setChineseName(e.target.value)}
            />
          </div>
          <div>
            <label className="cosmic-label block mb-2">英文護照姓名</label>
            <input
              className="cosmic-input"
              placeholder="例：WANG XIAO MING"
              value={englishName}
              onChange={e => setEnglishName(e.target.value.toUpperCase())}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="cosmic-label block mb-2">出生年份</label>
            <input
              className="cosmic-input"
              placeholder="1990"
              type="number"
              value={birthYear}
              onChange={e => setBirthYear(e.target.value)}
              min={1900}
              max={2099}
            />
          </div>
          <div>
            <label className="cosmic-label block mb-2">月份</label>
            <input
              className="cosmic-input"
              placeholder="1-12"
              type="number"
              value={birthMonth}
              onChange={e => setBirthMonth(e.target.value)}
              min={1}
              max={12}
            />
          </div>
          <div>
            <label className="cosmic-label block mb-2">日期</label>
            <input
              className="cosmic-input"
              placeholder="1-31"
              type="number"
              value={birthDay}
              onChange={e => setBirthDay(e.target.value)}
              min={1}
              max={31}
            />
          </div>
        </div>

        {error && (
          <div className="text-sm text-destructive border border-destructive/40 px-4 py-2 bg-destructive/10">
            ⚠ {error}
          </div>
        )}

        <button className="btn-cosmic w-full py-4 text-base" onClick={handleCalculate}>
          ◆ 啟動靈數解析 ◆
        </button>
      </div>

      {/* Results */}
      {profile && (
        <div className="space-y-4 animate-fade-in">
          <div className="energy-bar" />
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <span className="cosmic-label text-primary">◈ 生命數字藍圖已顯現 ◈</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          {/* Core Numbers Display */}
          <div className="grid grid-cols-4 gap-2 brutal-card p-4 border-2 border-primary/30">
            {NUMBER_FIELDS.slice(0, 4).map(({ key, label, accent }) => {
              const val = profile[key as keyof NumerologyProfile];
              const numVal = typeof val === "number" ? val : null;
              return (
                <div key={key} className="text-center">
                  <div className={`text-4xl font-bold mb-1 number-display${accent === "cyan" ? "-cyan" : accent === "magenta" ? "-magenta" : ""}`}
                    style={{ fontFamily: "var(--font-mono)" }}>
                    {numVal ?? "—"}
                  </div>
                  <div className="cosmic-label text-xs leading-tight">{label.split(" ")[0]}</div>
                </div>
              );
            })}
          </div>

          {/* Individual cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NUMBER_FIELDS.map(({ key, label, accent }) => {
              const val = profile[key as keyof NumerologyProfile];
              const numVal = typeof val === "number" ? val : null;
              return (
                <NumberInputCard
                  key={key}
                  label={label}
                  typeKey={key}
                  colorAccent={accent}
                  readonly
                  readonlyValue={numVal}
                />
              );
            })}
          </div>

          {/* Pinnacles */}
          <div className="brutal-card p-4 border-2 border-secondary/40 space-y-3">
            <div className="cosmic-label">◎ 高峰數 Pinnacles — 人生四個重要階段</div>
            <div className="grid grid-cols-4 gap-3">
              {profile.pinnacles.map((p, i) => (
                <div key={i} className="text-center brutal-card-cyan p-3">
                  <div className="text-2xl font-bold number-display-cyan mb-1" style={{ fontFamily: "var(--font-mono)" }}>{p}</div>
                  <div className="cosmic-label text-xs">第{i + 1}高峰</div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="brutal-card p-4 border-2 border-accent/40 space-y-3">
            <div className="cosmic-label">◎ 挑戰數 Challenges — 人生四個功課</div>
            <div className="grid grid-cols-4 gap-3">
              {profile.challenges.map((c, i) => (
                <div key={i} className="text-center brutal-card-magenta p-3">
                  <div className="text-2xl font-bold number-display-magenta mb-1" style={{ fontFamily: "var(--font-mono)" }}>{c}</div>
                  <div className="cosmic-label text-xs">第{i + 1}挑戰</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoCalculateMode;
