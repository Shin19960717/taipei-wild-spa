import { LINE_ADD_FRIEND_URL } from "@/lib/line";
import { NAV_LINK_CLASS } from "@/constants/uiClasses";

type NavItem = {
  id: string;
  label: string;
};

type HeaderNavProps = {
  navItems: NavItem[];
  onScrollToSection: (sectionId: string) => void;
  navContactLabel: string;
};

export default function HeaderNav({
  navItems,
  onScrollToSection,
  navContactLabel,
}: HeaderNavProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 w-full">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onScrollToSection(item.id)}
          className={NAV_LINK_CLASS}
        >
          {item.label}
        </button>
      ))}

      <a
        href={LINE_ADD_FRIEND_URL}
        target="_blank"
        rel="noreferrer"
        className="px-3 py-1 text-sm bg-black text-white rounded-full transition hover:opacity-90"
      >
        {navContactLabel}
      </a>
    </div>
  );
}