import { useState } from "react";
import { NumerologyProfile } from "@/lib/numerology";
import { NUMBER_MEANINGS } from "@/data/numerologyData";

interface AIReportProps {
  profile?: NumerologyProfile;
  name?: string;
}

function generateReport(profile: NumerologyProfile, name: string): string {
  const lp = NUMBER_MEANINGS[profile.lifePath];
  const bd = NUMBER_MEANINGS[profile.birthday];
  const gift = NUMBER_MEANINGS[profile.giftNumber];
  const soul = NUMBER_MEANINGS[profile.soulUrge];
  const pers = NUMBER_MEANINGS[profile.personality];

  return `# ✦ 生命靈數解析報告

**靈魂之名：** ${name}  
**報告生成者：** 福青施老師 · 宇宙數字觀測站  
**解析頻率：** 覺醒次元 · 靈魂層面

---

## 壹、生命藍圖概覽

在宇宙浩瀚的數字海洋中，每一個靈魂都帶著獨特的振動頻率降臨人間。${name}，你的生命藍圖由一組精妙的數字構成，這些數字不是偶然，而是你靈魂在降生前便已設定好的課題與使命。

你的核心靈數結構如下：

- **生命靈數（Life Path）：${profile.lifePath}** — ${lp?.title || "能量中"}
- **生日數（Birthday）：${profile.birthday}** — ${bd?.title || "能量中"}  
- **天賦數（Gift）：${profile.giftNumber}** — ${gift?.title || "能量中"}
- **靈魂數（Soul Urge）：${profile.soulUrge}** — ${soul?.title || "能量中"}
- **人格數（Personality）：${profile.personality}** — ${pers?.title || "能量中"}

這五個核心數字，構成了你靈魂在這一世的能量骨架。

---

## 貳、生命靈數深度解析 — 你的人生道路

${lp ? `**生命靈數 ${profile.lifePath}：${lp.title}**

${lp.essence}

你來到這個世界，帶著「${lp.keywords.join('、')}」的核心能量。這不僅是你的天賦，也是你最重要的人生學習主題。

**此生的核心優勢：**
${lp.strengths.map(s => `- ${s}`).join('\n')}

**靈魂的成長挑戰：**
${lp.challenges.map(c => `- ${c}`).join('\n')}

**人生功課：** ${lp.lifeLesson}` : "生命靈數解析中..."}

---

## 參、天生氣質解析 — 生日數的秘密

${bd ? `**生日數 ${profile.birthday}：${bd.title}**

生日數揭示你與生俱來的自然氣質與本能反應。當你在一個陌生的環境中，當你還沒有時間「表演」自己時，你最自然流露的狀態，就是你生日數的展現。

${bd.birthday || bd.essence}

你天生的核心關鍵字是：**${bd.keywords.join('、')}**

> ${bd.quote}` : "生日數解析中..."}

---

## 肆、靈魂渴望解析 — 你真正想要的是什麼

${soul ? `**靈魂數 ${profile.soulUrge}：${soul.title}**

在所有的生命數字中，靈魂數是最私密也最真實的。它象徵你靈魂深處最真實的渴望——不是他人期待你想要的，不是社會告訴你應該追求的，而是你內心最深處、最赤裸的心靈呼喚。

${soul.soulUrge || soul.essence}

**你的靈魂在這一世，最深的渴望是：**
在每一個當下，都能真實地活出自己。當你能夠誠實面對這個渴望，並且允許自己去追求它，你的整個生命能量便會開始向更高的頻率流動。` : "靈魂數解析中..."}

---

## 伍、外在形象解析 — 人格數的社會面具

${pers ? `**人格數 ${profile.personality}：${pers.title}**

人格數是你「展示給世界的自己」。這是你的社會面具，是他人第一印象中看到的你。有趣的是，這個面具並非虛假——它是你真實能量的一個折射，只是它只呈現了你完整存在的某一個面向。

${pers.personality || pers.essence}

當他人第一次見到你，他們感受到的是：${pers.keywords.slice(0, 3).join('、')}的能量。這種外在印象，有時候會讓真正了解你的人需要更多時間——因為你內在的豐富遠超過外在所展現的。` : "人格數解析中..."}

---

## 陸、天賦能量解析 — 你潛藏的才能

${gift ? `**天賦數 ${profile.giftNumber}：${gift.title}**

天賦數是宇宙在你降生時放入你靈魂行李箱中的禮物。這是你天生就擁有的能力，有時你自己都沒有意識到這是多麼珍貴的特質，因為對你來說，它太自然了，自然到你以為人人都有。

${gift.giftNumber || gift.essence}

**你的天賦禮物：**
${gift.strengths.slice(0, 3).map(s => `- ${s}`).join('\n')}

不要輕視這些天賦。它們是宇宙特意為你配置的工具，目的是讓你在這一世的使命中，有足夠的能力去完成靈魂所設定的功課。` : "天賦數解析中..."}

---

## 柒、人生階段與高峰數解析

你的人生被劃分為四個重要的能量階段，每個階段都有其獨特的發展主題：

${profile.pinnacles.map((p, i) => {
  const pm = NUMBER_MEANINGS[p];
  const stages = ["青年期（約25歲前）", "成年期（約25-34歲）", "壯年期（約35-43歲）", "成熟期（44歲以後）"];
  return `**第${i + 1}高峰期 — ${stages[i]}：高峰數 ${p}${pm ? ` (${pm.title})` : ''}**\n${pm ? pm.lifePath || pm.essence : '能量發展中...'}`;
}).join('\n\n')}

---

## 捌、挑戰數解析 — 靈魂的考驗

靈魂的成長從來不是一帆風順的。你的挑戰數揭示了你在人生各個階段可能面臨的最大考驗：

${profile.challenges.map((c, i) => {
  const cm = NUMBER_MEANINGS[c];
  return `**第${i + 1}挑戰 — 挑戰數 ${c}${cm ? ` (${cm.title})` : ''}：**\n${cm ? cm.lifeLesson : '此為你的特殊挑戰課題。'}`;
}).join('\n\n')}

記住：挑戰數不是詛咒，而是靈魂特意選擇的成長課題。每一個挑戰的背後，都藏著同等大小的禮物。

---

## 玖、數字之間的關聯與整體能量分析

你的生命藍圖中，最值得注意的能量互動是：

**生命靈數 ${profile.lifePath} 與天賦數 ${profile.giftNumber} 的協作：**
當你的核心使命（${profile.lifePath}）與天賦能量（${profile.giftNumber}）能夠協調一致時，你的人生將進入最自然的流動狀態。${
  profile.lifePath === profile.giftNumber
    ? "你的生命靈數與天賦數相同，這意味著你的使命與天賦高度一致——你天生就帶著完成使命所需的工具。這是強大的能量組合。"
    : `你的 ${profile.lifePath} 使命能量與 ${profile.giftNumber} 天賦能量形成互補，兩者的結合將創造出獨特的生命表達方式。`
}

**靈魂數 ${profile.soulUrge} 與人格數 ${profile.personality} 的張力：**
${
  profile.soulUrge === profile.personality
    ? "你的靈魂渴望與外在形象高度一致，你是一個「表裡如一」的人，很少有內外不符的衝突感。"
    : `你的內在渴望（${profile.soulUrge}）與外在展現（${profile.personality}）之間存在差異。這種張力是你成長的動力——學習讓你的外在形象更真實地反映你的內在渴望。`
}

---

## 拾、個人年數解析 — 此刻的宇宙時機

**個人年數：${profile.personalYear}**

在生命的大週期中，你目前正處於「${NUMBER_MEANINGS[profile.personalYear]?.title || `${profile.personalYear}號能量`}」的年份能量中。${
  NUMBER_MEANINGS[profile.personalYear]
    ? NUMBER_MEANINGS[profile.personalYear].lifePath || NUMBER_MEANINGS[profile.personalYear].essence
    : ""
}

宇宙總是在最完美的時機為我們安排最適合的功課。此刻的能量既是你的現狀，也是你的跳板。

---

## 拾壹、行動建議

基於你的整體生命靈數結構，以下是來自宇宙的具體行動建議：

1. **每日靈性練習**：定期與自己的生命靈數 ${profile.lifePath} 的能量連結，用靜心或日記反思自己是否活在這個核心使命的頻率上。

2. **善用天賦**：你的天賦數 ${profile.giftNumber} 提醒你，有些能力對你來說太自然，你可能不認為它是天賦。試著刻意去運用它，讓它服務更多人。

3. **面對挑戰數**：你的主要挑戰不是要被消滅的，而是要被整合的。每當你感到最困難的時候，問自己：「這個挑戰在教我什麼？」

4. **傾聽靈魂數**：給自己更多時間獨處，聆聽你靈魂數 ${profile.soulUrge} 的真實聲音。你真正想要的，往往在安靜中才能聽見。

5. **活在當下的能量**：你的個人年數 ${profile.personalYear} 為你揭示了此刻最重要的功課。不要急著跳到下一個階段，當下的能量正在給你最珍貴的禮物。

---

## 拾貳、生命啟示金句

> *「你不是一個偶然降生的靈魂，你是宇宙精心設計的傑作。每一個數字都是你靈魂的一部分，每一個挑戰都是你成長的階梯。當你開始理解自己的生命藍圖，你就開始了真正的自我覺醒之旅。」*  
> — 福青施老師

---

## 拾參、寓言故事 — 數字星球的旅人

從前，在宇宙的某個角落，有一個靈魂準備降生人間。

在降生之前，靈魂大廳的守護神拿出了一個神聖的數字藍圖，說：「你這一世的核心使命是 **${profile.lifePath}** 號能量——**${lp?.title || '生命之光'}**。你將帶著這個能量，去完成你的靈魂學習。」

靈魂問：「那我會有足夠的工具嗎？」

守護神微笑著說：「我們為你準備了天賦禮物——${profile.giftNumber} 號能量的 **${gift?.title || '天賦之光'}**。還有你的生日，${profile.birthday} 號的 **${bd?.title || '本質之光'}**，那是你最自然的本質。」

「但是，旅程中會有挑戰嗎？」靈魂有些擔心。

「當然，」守護神溫柔地說，「沒有挑戰的旅程，不是真正的旅程。但記住——每一個困難的背後，都藏著等量的禮物。你的挑戰數是 ${profile.challenges[0]}，那是你最深的學習功課，也是你最大的成長空間。」

靈魂沉默了片刻，然後問出最後一個問題：「那，我的靈魂真正渴望的是什麼？」

守護神輕輕地將手放在靈魂的心上：「你的靈魂數是 ${profile.soulUrge}——**${soul?.title || '靈魂之渴'}**。你這一世，最深的渴望是${soul ? soul.soulUrge || soul.essence.substring(0, 50) + '...' : '活出真實的自我'}。不要讓外在世界的噪音淹沒這個內在的聲音。」

靈魂帶著這些神聖的數字藍圖，降生人間，開始了這場精彩的冒險。

而你，就是那個靈魂。

---

*✦ 此報告由福青施老師 · 生命靈數宇宙觀測站生成*  
*每一個數字都是宇宙給你的訊息，願你帶著覺知，繼續美麗的旅程。*
`;
}

const AIReport = ({ profile, name = "靈魂旅者" }: AIReportProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState(!!profile);

  // Manual input when no profile is provided
  const [manualProfile, setManualProfile] = useState({
    lifePath: "",
    birthday: "",
    giftNumber: "",
    soulUrge: "",
    personality: "",
    expressionNumber: "",
    personalYear: "",
    pinnacle1: "",
    pinnacle2: "",
    pinnacle3: "",
    pinnacle4: "",
    challenge1: "",
    challenge2: "",
    challenge3: "",
    challenge4: "",
  });
  const [reportName, setReportName] = useState(name);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const p: NumerologyProfile = profile || {
        lifePath: parseInt(manualProfile.lifePath) || 1,
        birthday: parseInt(manualProfile.birthday) || 1,
        giftNumber: parseInt(manualProfile.giftNumber) || 1,
        soulUrge: parseInt(manualProfile.soulUrge) || 1,
        personality: parseInt(manualProfile.personality) || 1,
        expressionNumber: parseInt(manualProfile.expressionNumber) || 1,
        personalYear: parseInt(manualProfile.personalYear) || 1,
        chineseNameNumber: 1,
        pinnacles: [
          parseInt(manualProfile.pinnacle1) || 1,
          parseInt(manualProfile.pinnacle2) || 1,
          parseInt(manualProfile.pinnacle3) || 1,
          parseInt(manualProfile.pinnacle4) || 1,
        ],
        challenges: [
          parseInt(manualProfile.challenge1) || 1,
          parseInt(manualProfile.challenge2) || 1,
          parseInt(manualProfile.challenge3) || 1,
          parseInt(manualProfile.challenge4) || 1,
        ],
        nineGrid: {},
      };
      const r = generateReport(p, reportName);
      setReport(r);
      setIsGenerating(false);

      // Save to library
      const records = JSON.parse(localStorage.getItem("numerology-records") || "[]");
      records.unshift({
        id: Date.now(),
        name: reportName,
        date: new Date().toLocaleDateString("zh-TW"),
        profile: p,
        report: r,
      });
      localStorage.setItem("numerology-records", JSON.stringify(records.slice(0, 20)));
    }, 1800);
  };

  // Parse markdown to simple HTML
  const renderMarkdown = (md: string) => {
    return md
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$2</h2>'.replace('$2', '$1'))
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li><strong>$1.</strong> $2</li>')
      .replace(/---/g, '<hr style="border-color:hsl(var(--border));margin:1.5rem 0">')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[h|b|l|u|o|p|i|s|e|d])(.+)$/gm, '$1');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="brutal-card p-6 border-2 border-primary/30">
        <div className="cosmic-label mb-2">AI 生命靈數解析報告</div>
        <h2 className="section-title text-2xl text-gradient-gold mb-2">完整靈數報告</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          基於你的生命數字藍圖，生成一份超過千字的完整靈性解析報告。涵蓋人格特質、靈魂渴望、人生方向與具體行動建議。
        </p>
      </div>

      {/* Input or Profile Display */}
      {!profile && (
        <div className="brutal-card p-5 border-2 border-border space-y-4">
          <div className="cosmic-label">◈ 輸入你的靈數資料</div>
          <div>
            <label className="cosmic-label block mb-2">姓名</label>
            <input
              className="cosmic-input"
              placeholder="你的名字"
              value={reportName}
              onChange={e => setReportName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: "lifePath", label: "生命靈數" },
              { key: "birthday", label: "生日數" },
              { key: "giftNumber", label: "天賦數" },
              { key: "soulUrge", label: "靈魂數" },
              { key: "personality", label: "人格數" },
              { key: "expressionNumber", label: "天命數" },
              { key: "personalYear", label: "個人年數" },
              { key: "pinnacle1", label: "高峰數一" },
              { key: "pinnacle2", label: "高峰數二" },
              { key: "challenge1", label: "挑戰數一" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="cosmic-label block mb-1 text-xs">{label}</label>
                <input
                  type="number"
                  min={0}
                  max={33}
                  className="cosmic-input py-2"
                  placeholder="1-33"
                  value={manualProfile[key as keyof typeof manualProfile]}
                  onChange={e => setManualProfile(prev => ({ ...prev, [key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {profile && (
        <div className="brutal-card p-4 border-2 border-primary/20 grid grid-cols-4 gap-3">
          {[
            { label: "生命靈數", val: profile.lifePath },
            { label: "生日數", val: profile.birthday },
            { label: "天賦數", val: profile.giftNumber },
            { label: "靈魂數", val: profile.soulUrge },
          ].map(({ label, val }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold number-display" style={{ fontFamily: "var(--font-mono)" }}>{val}</div>
              <div className="cosmic-label text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      )}

      <button
        className="btn-cosmic w-full py-5 text-lg"
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-3">
            <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            宇宙能量正在凝聚解析中…
          </span>
        ) : (
          "◆ 生成完整靈數解析報告 ◆"
        )}
      </button>

      {/* Report Display */}
      {report && (
        <div className="brutal-card border-2 border-primary/30 overflow-hidden animate-fade-in">
          {/* Report Header */}
          <div
            className="px-6 py-4 border-b border-border/50 flex items-center justify-between"
            style={{ background: "hsl(var(--primary)/0.05)" }}
          >
            <div>
              <div className="cosmic-label">生命靈數解析報告</div>
              <div className="text-sm font-bold text-primary mt-0.5">{reportName} · 福青施老師</div>
            </div>
            <button
              className="btn-cosmic-cyan text-xs px-3 py-2"
              onClick={() => {
                const el = document.createElement("a");
                el.href = "data:text/plain;charset=utf-8," + encodeURIComponent(report);
                el.download = `${reportName}_靈數報告.txt`;
                el.click();
              }}
            >
              下載報告
            </button>
          </div>
          {/* Report Content */}
          <div className="p-6 max-h-screen overflow-y-auto">
            <div className="report-content">
              {report.split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i}>{line.slice(2)}</h1>;
                if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
                if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>;
                if (line.startsWith('> ')) return <blockquote key={i}>{line.slice(2)}</blockquote>;
                if (line.startsWith('- ')) return <p key={i}><span style={{ color: "hsl(var(--primary))" }}>◆ </span>{line.slice(2)}</p>;
                if (/^\d+\. /.test(line)) {
                  const [num, ...rest] = line.split('. ');
                  return <p key={i}><strong style={{ color: "hsl(var(--primary))" }}>{num}.</strong> {rest.join('. ')}</p>;
                }
                if (line === '---') return <hr key={i} style={{ borderColor: "hsl(var(--border))", margin: "1.5rem 0" }} />;
                if (line.trim() === '') return <div key={i} className="h-2" />;
                return (
                  <p key={i}
                    dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.+?)\*/g, '<em>$1</em>'),
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIReport;
