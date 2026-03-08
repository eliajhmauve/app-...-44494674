import { useState, useCallback } from "react";
import OpeningAnimation from "@/components/OpeningAnimation";
import AutoCalculateMode from "@/components/AutoCalculateMode";
import ReviewLearningMode from "@/components/ReviewLearningMode";
import LifePyramid from "@/components/LifePyramid";
import NineGrid from "@/components/NineGrid";
import NameNumerology from "@/components/NameNumerology";
import AIReport from "@/components/AIReport";
import ReviewLibrary from "@/components/ReviewLibrary";
import { NumerologyProfile } from "@/lib/numerology";

const TABS = [
  { id: "auto", label: "自動計算", icon: "◈" },
  { id: "review", label: "復盤學習", icon: "◎" },
  { id: "pyramid", label: "生命金字塔", icon: "▲" },
  { id: "grid", label: "九宮格", icon: "⊞" },
  { id: "name", label: "姓名靈數", icon: "✦" },
  { id: "report", label: "靈數報告", icon: "◆" },
  { id: "library", label: "紀錄庫", icon: "◉" },
];

const Index = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [activeTab, setActiveTab] = useState("auto");
  const [generatedProfile, setGeneratedProfile] = useState<NumerologyProfile | null>(null);
  const [profileName, setProfileName] = useState("靈魂旅者");

  const handleAnimationComplete = useCallback(() => {
    setShowAnimation(false);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      {showAnimation && <OpeningAnimation onComplete={handleAnimationComplete} />}

      {showContent && (
        <div className="animate-fade-in">
          {/* Top Energy Bar */}
          <div className="energy-bar" />

          {/* Header */}
          <header className="border-b border-border/50 bg-card/80 backdrop-blur sticky top-0 z-40">
            <div className="max-w-5xl mx-auto px-4">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  {/* Logo */}
                  <div
                    className="w-10 h-10 border-2 border-primary flex items-center justify-center font-bold text-lg animate-cosmic-pulse"
                    style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--primary))" }}
                  >
                    ∞
                  </div>
                  <div>
                    <div className="font-bold text-sm leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                      生命靈數宇宙觀測站
                    </div>
                    <div className="cosmic-label text-xs opacity-60">福青施老師 · LIFE NUMEROLOGY</div>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <span className="cosmic-label text-xs" style={{ color: "hsl(var(--primary)/0.6)" }}>
                    命運的能量結構 · 靈魂的振動頻率
                  </span>
                </div>
              </div>

              {/* Tab Nav */}
              <div className="flex overflow-x-auto scrollbar-hide gap-0 -mb-px pb-0">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    className={`cosmic-tab flex items-center gap-1.5 whitespace-nowrap ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span style={{ fontSize: "0.75rem" }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* Hero Banner (only on auto tab) */}
          {activeTab === "auto" && (
            <div className="relative overflow-hidden border-b border-border/30">
              {/* Sacred geometry background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="sacred-geometry w-96 h-96 opacity-5" />
                <div className="sacred-geometry w-64 h-64 opacity-5 animate-rotate-slow-reverse absolute" />
              </div>
              <div className="max-w-5xl mx-auto px-4 py-10 relative">
                <div className="max-w-2xl">
                  <div className="cosmic-label mb-3 text-primary">◈ 宇宙數字的訊息</div>
                  <h1 className="section-title text-4xl md:text-6xl mb-4 text-gradient-gold leading-none">
                    生命的數字藍圖
                  </h1>
                  <p className="text-muted-foreground text-base leading-relaxed mb-2">
                    每個靈魂降臨人間，都帶著一組神聖的數字密碼。
                    這些數字不是偶然，而是你的靈魂在宇宙中的振動頻率。
                  </p>
                  <div className="flex flex-wrap gap-3 mt-6">
                    {["靈魂的振動頻率", "命運的能量結構", "內在覺察的密碼"].map(phrase => (
                      <span
                        key={phrase}
                        className="text-xs px-3 py-1.5 border"
                        style={{
                          borderColor: "hsl(var(--primary)/0.3)",
                          color: "hsl(var(--primary)/0.8)",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {phrase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="max-w-5xl mx-auto px-4 py-6 pb-20">
            {activeTab === "auto" && (
              <AutoCalculateMode
                onProfileGenerated={(p, n) => {
                  setGeneratedProfile(p);
                  setProfileName(n);
                }}
              />
            )}
            {activeTab === "review" && <ReviewLearningMode />}
            {activeTab === "pyramid" && <LifePyramid />}
            {activeTab === "grid" && <NineGrid />}
            {activeTab === "name" && <NameNumerology />}
            {activeTab === "report" && (
              <AIReport profile={generatedProfile || undefined} name={profileName} />
            )}
            {activeTab === "library" && <ReviewLibrary />}
          </main>

          {/* Footer */}
          <footer className="border-t border-border/30 py-6 text-center">
            <div className="cosmic-label text-xs opacity-40">
              ✦ 福星何大師 · 生命靈數宇宙觀測站 · LIFE NUMEROLOGY COSMOS ✦
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Index;
