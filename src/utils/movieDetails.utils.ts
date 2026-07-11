export function hasValue(value?: string | null): boolean {
  return Boolean(
    value &&
    value.trim() !== "" &&
    value !== "N/A"
  );
}