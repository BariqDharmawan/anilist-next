export const withoutSpecialChar = /^[a-zA-Z0-9.]*$/;

export function checkSpecialChar(str: string): boolean {
  return withoutSpecialChar.test(str);
}
