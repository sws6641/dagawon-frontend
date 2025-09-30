type ClassValue = string | undefined | null | false;

export function cn(...inputs: ClassValue[]) {
  // falsy 값 제거 후 공백으로 합치기
  return inputs.filter(Boolean).join(" ");
}