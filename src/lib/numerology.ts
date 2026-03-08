// 生命靈數計算引擎

export const MASTER_NUMBERS = [11, 22, 33];

/** 將數字縮減為個位數，保留主數 11/22/33 */
export function reduceNumber(n: number): number {
  if (MASTER_NUMBERS.includes(n)) return n;
  if (n <= 9) return n;
  const sum = String(n).split('').reduce((acc, d) => acc + parseInt(d), 0);
  return reduceNumber(sum);
}

/** 將字串中所有數字加總後縮減 */
export function reduceDigits(digits: number[]): number {
  const sum = digits.reduce((acc, d) => acc + d, 0);
  return reduceNumber(sum);
}

/** 計算生命靈數 (Life Path Number) */
export function calcLifePath(year: number, month: number, day: number): number {
  const y = reduceNumber(
    String(year).split('').reduce((a, d) => a + parseInt(d), 0)
  );
  const m = reduceNumber(month);
  const d = reduceNumber(day);
  return reduceNumber(y + m + d);
}

/** 計算生日數 (Birthday Number) */
export function calcBirthday(day: number): number {
  return reduceNumber(day);
}

/** 計算天賦數 (Expression/Destiny Number from full birth name) */
export function calcExpressionNumber(fullName: string): number {
  const letterValues = getLetterValues(fullName.toUpperCase());
  return reduceDigits(letterValues);
}

/** 計算靈魂數 (Soul Urge - 母音) */
export function calcSoulUrge(name: string): number {
  const vowels = 'AEIOU';
  const upper = name.toUpperCase();
  const values = upper.split('').filter(c => vowels.includes(c)).map(c => letterToNumber(c));
  if (values.length === 0) return 0;
  return reduceDigits(values);
}

/** 計算人格數 (Personality - 子音) */
export function calcPersonality(name: string): number {
  const vowels = 'AEIOU';
  const upper = name.toUpperCase();
  const values = upper.split('').filter(c => c >= 'A' && c <= 'Z' && !vowels.includes(c)).map(c => letterToNumber(c));
  if (values.length === 0) return 0;
  return reduceDigits(values);
}

/** 計算天賦數 (從生日日期) */
export function calcGiftNumber(month: number, day: number): number {
  return reduceNumber(reduceNumber(month) + reduceNumber(day));
}

/** 計算高峰數 */
export function calcPinnacles(year: number, month: number, day: number): number[] {
  const lp = calcLifePath(year, month, day);
  const m = reduceNumber(month);
  const d = reduceNumber(day);
  const y = reduceNumber(String(year).split('').reduce((a, c) => a + parseInt(c), 0));

  const p1 = reduceNumber(m + d);
  const p2 = reduceNumber(d + y);
  const p3 = reduceNumber(p1 + p2);
  const p4 = reduceNumber(m + y);

  return [p1, p2, p3, p4];
}

/** 計算挑戰數 */
export function calcChallenges(year: number, month: number, day: number): number[] {
  const m = reduceNumber(month);
  const d = reduceNumber(day);
  const y = reduceNumber(String(year).split('').reduce((a, c) => a + parseInt(c), 0));

  const c1 = Math.abs(m - d);
  const c2 = Math.abs(d - y);
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(m - y);

  return [c1, c2, c3, c4];
}

/** 計算個人年數 */
export function calcPersonalYear(year: number, month: number, day: number, currentYear: number): number {
  const m = reduceNumber(month);
  const d = reduceNumber(day);
  const cy = reduceNumber(String(currentYear).split('').reduce((a, c) => a + parseInt(c), 0));
  return reduceNumber(m + d + cy);
}

/** 計算九宮格出現的數字 */
export function calcNineGrid(birthdate: string): Record<number, number> {
  const counts: Record<number, number> = {};
  const digits = birthdate.replace(/[^0-9]/g, '').split('').map(Number).filter(d => d > 0);
  digits.forEach(d => {
    counts[d] = (counts[d] || 0) + 1;
  });
  return counts;
}

/** 字母轉數字 (Pythagorean) */
export function letterToNumber(c: string): number {
  const map: Record<string, number> = {
    A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
    J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
    S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8
  };
  return map[c] || 0;
}

export function getLetterValues(name: string): number[] {
  return name.toUpperCase().split('').filter(c => c >= 'A' && c <= 'Z').map(letterToNumber);
}

/** 從中文姓名計算能量數 */
export function calcChineseNameNumber(name: string): number {
  // 使用筆劃概念的簡化版：每個字的Unicode碼位加總後縮減
  const sum = name.split('').reduce((acc, char) => {
    const code = char.codePointAt(0) || 0;
    // 縮減碼位
    let n = code;
    while (n > 9) {
      n = String(n).split('').reduce((a, d) => a + parseInt(d), 0);
    }
    return acc + n;
  }, 0);
  return reduceNumber(sum);
}

/** 完整計算所有靈數 */
export interface NumerologyProfile {
  lifePath: number;
  birthday: number;
  giftNumber: number;
  personality: number;
  soulUrge: number;
  expressionNumber: number;
  pinnacles: number[];
  challenges: number[];
  personalYear: number;
  chineseNameNumber: number;
  nineGrid: Record<number, number>;
}

export function calcFullProfile(
  chineseName: string,
  englishName: string,
  year: number,
  month: number,
  day: number
): NumerologyProfile {
  const currentYear = new Date().getFullYear();
  const birthdateStr = `${year}${String(month).padStart(2,'0')}${String(day).padStart(2,'0')}`;

  return {
    lifePath: calcLifePath(year, month, day),
    birthday: calcBirthday(day),
    giftNumber: calcGiftNumber(month, day),
    personality: calcPersonality(englishName),
    soulUrge: calcSoulUrge(englishName),
    expressionNumber: calcExpressionNumber(englishName),
    pinnacles: calcPinnacles(year, month, day),
    challenges: calcChallenges(year, month, day),
    personalYear: calcPersonalYear(year, month, day, currentYear),
    chineseNameNumber: calcChineseNameNumber(chineseName),
    nineGrid: calcNineGrid(birthdateStr),
  };
}
