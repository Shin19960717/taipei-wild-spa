import { LINE_ADD_FRIEND_URL } from "@/lib/line";

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
    <nav className="flex min-w-0 flex-1 items-center">
      <ul className="flex min-w-0 flex-wrap items-center gap-2 lg:gap-3">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onScrollToSection(item.id)}
              className="whitespace-nowrap rounded-full border border-black/20 bg-white px-4 py-2 text-sm text-stone-800 transition hover:bg-black hover:text-white"
            >
              {item.label}
            </button>
          </li>
        ))}

        <li>
          <a
            href={LINE_ADD_FRIEND_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex whitespace-nowrap rounded-full bg-black px-4 py-2 text-sm text-white transition hover:opacity-90"
          >
            {navContactLabel}
          </a>
        </li>
      </ul>
    </nav>
  );
}