export function isInternalLink(s?: string): boolean {
  if (!s) {
    return false;
  }

  try {
    new URL(s);
    return false;
  } catch (_e) {
    return true;
  }
}
