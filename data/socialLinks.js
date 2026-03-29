import { LINE_ADD_FRIEND_URL } from "@/lib/line";
import { ICON_BUTTON_CLASS } from "@/constants/uiClasses";

const SOCIAL_LINKS = [
  {
    name: "LINE",
    href: LINE_ADD_FRIEND_URL,
    iconClass: "ri-line-fill text-xl text-white",
    className: `${ICON_BUTTON_CLASS} bg-[#06C755] border-[#06C755] hover:opacity-90`,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/taipei_wildspa?igsh=MWsxNm1odnV0M2JkdQ%3D%3D&utm_source=qr",
    iconClass: "ri-instagram-line text-xl",
    className: `${ICON_BUTTON_CLASS} hover:bg-black hover:text-white`,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61576573349568",
    iconClass: "ri-facebook-circle-line text-xl",
    className: `${ICON_BUTTON_CLASS} hover:bg-black hover:text-white`,
  },
  {
    name: "X",
    href: "https://x.com/taipei_wildspa?s=21",
    iconClass: "ri-twitter-x-line text-xl",
    className: `${ICON_BUTTON_CLASS} hover:bg-black hover:text-white`,
  },
];

export default SOCIAL_LINKS;