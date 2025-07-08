

export const roleBasedLinks: Record<string, string[]> = {
  ADMIN: [
    "dashboard",
    "verifications",
    "fraudflag",
    "fraudlist",
    "templates",
    "automationStudio",
    "settings",
    "adminSettings",
  ],
  USER: [
    "dashboard",
    "verifications",
    "fraudflag",
    "fraudlist",
    "settings",
  ],
  ANALYST: [
     "dashboard",
    "fraudlist",
    "settings",
  ],
};
