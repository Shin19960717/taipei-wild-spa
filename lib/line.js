export const LINE_CONFIG = {
  officialId: "@834xdutc",
};

export function buildLineAddFriendUrl() {
  return `https://line.me/R/ti/p/${encodeURIComponent(LINE_CONFIG.officialId)}`;
}

export const LINE_ADD_FRIEND_URL = buildLineAddFriendUrl();