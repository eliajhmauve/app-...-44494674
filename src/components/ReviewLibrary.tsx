import { useState, useEffect } from "react";
import { NumerologyProfile } from "@/lib/numerology";
import { NUMBER_MEANINGS } from "@/data/numerologyData";

interface ReviewRecord {
  id: number;
  name: string;
  date: string;
  profile: NumerologyProfile;
  report: string;
}

const ReviewLibrary = () => {
  const [records, setRecords] = useState<ReviewRecord[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("numerology-records") || "[]");
    setRecords(saved);
  }, []);

  const deleteRecord = (id: number) => {
    const updated = records.filter(r => r.id !== id);
    setRecords(updated);
    localStorage.setItem("numerology-records", JSON.stringify(updated));
    if (expanded === id) setExpanded(null);
  };

  const clearAll = () => {
    if (confirm("確定要清除所有復盤紀錄嗎？此動作無法復原。")) {
      setRecords([]);
      localStorage.removeItem("numerology-records");
      setExpanded(null);
    }
  };

  if (records.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="brutal-card p-6 border-2 border-border">
          <div className="cosmic-label mb-2">復盤紀錄庫</div>
          <h2 className="section-title text-2xl text-gradient-gold mb-2">學習紀錄庫</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            每一次的靈數解析都會自動保存在這裡，讓你能夠長期追蹤自己的靈性成長旅程。
          </p>
        </div>

        <div className="text-center py-20 space-y-4">
          <div
            className="text-8xl opacity-10 mx-auto"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--primary))" }}
          >
            ∅
          </div>
          <div className="text-muted-foreground">
            <p className="font-medium">尚無復盤紀錄</p>
            <p className="text-sm mt-1">使用自動計算模式並生成報告後，紀錄將自動保存於此</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="brutal-card p-6 border-2 border-border flex items-start justify-between">
        <div>
          <div className="cosmic-label mb-2">復盤紀錄庫</div>
          <h2 className="section-title text-2xl text-gradient-gold mb-1">學習紀錄庫</h2>
          <p className="text-muted-foreground text-sm">{records.length} 筆靈魂解析紀錄</p>
        </div>
        <button className="btn-cosmic-magenta text-xs px-3 py-2" onClick={clearAll}>
          清除全部
        </button>
      </div>

      {/* Records List */}
      <div className="space-y-3">
        {records.map(record => {
          const lp = NUMBER_MEANINGS[record.profile.lifePath];
          const isOpen = expanded === record.id;

          return (
            <div
              key={record.id}
              className={`brutal-card border-2 transition-all ${
                isOpen ? "border-primary/60" : "border-border hover:border-primary/30"
              }`}
            >
              {/* Record Header */}
              <div
                className="p-4 flex items-center gap-4 cursor-pointer"
                onClick={() => setExpanded(isOpen ? null : record.id)}
              >
                {/* Life Path Badge */}
                <div className="number-badge flex-shrink-0">{record.profile.lifePath}</div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-bold truncate">{record.name}</div>
                  <div className="cosmic-label text-xs mt-0.5">
                    {record.date} · 生命靈數 {record.profile.lifePath}
                    {lp ? ` · ${lp.title}` : ""}
                  </div>
                </div>

                {/* Quick Numbers */}
                <div className="hidden md:flex gap-2">
                  {[
                    { label: "生日", val: record.profile.birthday },
                    { label: "天賦", val: record.profile.giftNumber },
                    { label: "靈魂", val: record.profile.soulUrge },
                  ].map(({ label, val }) => (
                    <div key={label} className="text-center px-2">
                      <div
                        className="text-sm font-bold"
                        style={{ color: "hsl(var(--primary)/0.7)", fontFamily: "var(--font-mono)" }}
                      >
                        {val}
                      </div>
                      <div className="cosmic-label text-xs">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Expand Icon */}
                <div
                  className="text-primary transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  ▼
                </div>
              </div>

              {/* Expanded Content */}
              {isOpen && (
                <div className="border-t border-border/50 animate-fade-in">
                  {/* Profile Summary */}
                  <div className="p-4 bg-muted/30">
                    <div className="cosmic-label mb-3">靈數結構</div>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                      {[
                        { label: "生命", val: record.profile.lifePath },
                        { label: "生日", val: record.profile.birthday },
                        { label: "天賦", val: record.profile.giftNumber },
                        { label: "靈魂", val: record.profile.soulUrge },
                        { label: "人格", val: record.profile.personality },
                        { label: "天命", val: record.profile.expressionNumber },
                        { label: "個人年", val: record.profile.personalYear },
                        ...record.profile.pinnacles.map((p, i) => ({ label: `高峰${i + 1}`, val: p })),
                      ].map(({ label, val }) => (
                        <div key={label} className="text-center">
                          <div
                            className="text-xl font-bold"
                            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--primary))" }}
                          >
                            {val}
                          </div>
                          <div className="cosmic-label text-xs">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Report Preview */}
                  {record.report && (
                    <div className="p-4 max-h-80 overflow-y-auto">
                      <div className="cosmic-label mb-3">報告摘要</div>
                      <div className="text-sm text-muted-foreground leading-relaxed line-clamp-6 whitespace-pre-wrap">
                        {record.report.substring(0, 600)}...
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="p-4 border-t border-border/50 flex gap-3">
                    {record.report && (
                      <button
                        className="btn-cosmic text-xs px-4 py-2"
                        onClick={() => {
                          const el = document.createElement("a");
                          el.href = "data:text/plain;charset=utf-8," + encodeURIComponent(record.report);
                          el.download = `${record.name}_靈數報告_${record.date}.txt`;
                          el.click();
                        }}
                      >
                        下載報告
                      </button>
                    )}
                    <button
                      className="btn-cosmic-magenta text-xs px-4 py-2"
                      onClick={() => deleteRecord(record.id)}
                    >
                      刪除此紀錄
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewLibrary;
