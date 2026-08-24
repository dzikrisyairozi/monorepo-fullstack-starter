export function getCookie(name: string): string | null {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${encodeURIComponent(name)}=`));

  if (!match) {
    return null;
  }

  return decodeURIComponent(match.slice(match.indexOf('=') + 1));
}

export function setCookie(name: string, value: string, maxAge: number): void {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`;
}

export function removeCookie(name: string): void {
  document.cookie = `${encodeURIComponent(name)}=; path=/; max-age=0`;
}
