export function parseCookie(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};

  cookieString.split(";").forEach((cookie) => {
    const parts = cookie.split("=");
    if (parts.length === 2) {
      const name = parts[0].trim();
      const value = parts[1].trim();
      cookies[name] = value;
    }
  });

  return cookies;
}

export function getCookieValue(name: string) {
  return (
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""
  );
}
