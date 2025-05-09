// utils/enumMapper.ts
export function toPrismaEnum<T extends Record<string, string>>(
  enumObj: T,
  input: string
): T[keyof T] {
  const found = Object.entries(enumObj).find(
    ([key, value]) => value.toLowerCase() === input.toLowerCase()
  );

  if (!found) {
    throw new Error(`Invalid enum value: '${input}'`);
  }

  return found[1] as T[keyof T];
}
