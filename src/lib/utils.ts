export function toBengaliNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return "";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toLocaleString("en-US")
    .replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}
