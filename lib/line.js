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

export function getBookingMessage(memberName, lang, slot) {
  const hasSlot = slot && slot.date && slot.time;

  const messageMap = {
    zh: hasSlot
      ? `你好，我想預約 ${memberName}\n🗓️日期：${slot.date}\n⏰時間：${slot.time}\n💆🏻服務：`
      : `你好，我想預約 ${memberName}\n🗓️時間：\n💆🏻服務：`,
    en: hasSlot
      ? `Hello, I would like to book ${memberName}\n🗓️Date: ${slot.date}\n⏰Time: ${slot.time}\n💆🏻Service：`
      : `Hello, I would like to book ${memberName}\n🗓️Time:\n💆🏻Service：`,
    ja: hasSlot
      ? `こんにちは、${memberName}を予約したいです\n🗓️日付：${slot.date}\n⏰時間：${slot.time}\n💆🏻サービス：`
      : `こんにちは、${memberName}を予約したいです\n🗓️希望時間：\n💆🏻希望サービス：`,
    ko: hasSlot
      ? `안녕하세요, ${memberName} 예약하고 싶습니다\n🗓️날짜: ${slot.date}\n⏰시간: ${slot.time}\n💆🏻서비스:`
      : `안녕하세요, ${memberName} 예약하고 싶습니다\n🗓️시간:\n💆🏻서비스:`,
  };

  return messageMap[lang] || messageMap.zh;
}

export const LINE_ADD_FRIEND_URL = buildLineAddFriendUrl();

async function copyTextToClipboard(text) {
  if (typeof navigator === "undefined" || !navigator.clipboard) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export async function openLineBooking(memberName, lang, slot, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (typeof window === "undefined") return;

  const message = getBookingMessage(memberName, lang, slot);
  const oaMessageUrl = buildLineOaMessageUrl(message);

  // 手機：直接導到 LINE 官方帳號訊息頁
  if (isMobileDevice()) {
    window.location.assign(oaMessageUrl);
    return;
  }

  // 桌機：不要再用 window.open，避免被瀏覽器當成彈窗阻擋
  const copied = await copyTextToClipboard(message);

  if (copied) {
    alert("已幫你複製預約訊息，接著會開啟 LINE，加好友後可直接貼上送出。");
  } else {
    alert("即將開啟 LINE，但預約訊息複製失敗，請手動複製後貼上。");
  }

  // 同分頁跳轉，不會觸發 popup blocker
  window.location.assign(LINE_ADD_FRIEND_URL);
}