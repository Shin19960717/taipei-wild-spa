import { isMobileDevice } from "@/lib/device";

export const LINE_CONFIG = {
  officialId: "@834xdutc",
};

export function buildLineAddFriendUrl() {
  return `https://line.me/R/ti/p/${encodeURIComponent(LINE_CONFIG.officialId)}`;
}

export function buildLineOaMessageUrl(message) {
  return `https://line.me/R/oaMessage/${encodeURIComponent(
    LINE_CONFIG.officialId
  )}/?${encodeURIComponent((message || "").trim())}`;
}

export function getBookingMessage(memberName, lang) {
  const messageMap = {
    zh: `你好，我想預約 ${memberName}\n🗓️時間：\n💆🏻服務：`,
    en: `Hello, I would like to book ${memberName}\n🗓️Time:\n💆🏻Service:`,
    ja: `こんにちは、${memberName}を予約したいです\n🗓️希望時間：\n💆🏻希望サービス：`,
    ko: `안녕하세요, ${memberName} 예약하고 싶습니다\n🗓️시간:\n💆🏻서비스:`,
  };

  return messageMap[lang] || messageMap.zh;
}

export const LINE_ADD_FRIEND_URL = buildLineAddFriendUrl();

export function openLineBooking(memberName, lang) {
  if (typeof window === "undefined") return;

  const message = getBookingMessage(memberName, lang);
  const oaMessageUrl = buildLineOaMessageUrl(message);

  if (isMobileDevice()) {
    window.location.href = oaMessageUrl;
    return;
  }

  window.open(LINE_ADD_FRIEND_URL, "_blank", "noopener,noreferrer");
}