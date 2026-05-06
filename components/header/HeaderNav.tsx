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
      <ul className="flex min-w-0 flex-wrap items-center gap-3">
        {navItems.map((item, index) => (
          <li
            key={item.id}
            className="
              translate-y-0
              opacity-100

              transition-all
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
            "
            style={{
              transitionDelay: `${index * 60}ms`,
            }}
          >
            <button
              type="button"
              onClick={() => onScrollToSection(item.id)}
              className="
                whitespace-nowrap

                rounded-full

                border border-black/15
                bg-white/90

                px-5 py-3

                text-[15px]
                font-medium
                tracking-[0.02em]
                text-stone-800

                shadow-sm

                transition-all
                duration-300
                ease-[cubic-bezier(0.22,1,0.36,1)]

                hover:-translate-y-[1px]
                hover:bg-black
                hover:text-white

                active:scale-95
              "
            >
              {item.label}
            </button>
          </li>
        ))}

        <li
          className="
            translate-y-0
            opacity-100

            transition-all
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
          "
          style={{
            transitionDelay: `${navItems.length * 60}ms`,
          }}
        >
          <a
            href={LINE_ADD_FRIEND_URL}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex
              whitespace-nowrap

              rounded-full

              bg-black

              px-5 py-3

              text-[15px]
              font-medium
              tracking-[0.02em]
              text-white

              shadow-md

              transition-all
              duration-300
              ease-[cubic-bezier(0.22,1,0.36,1)]

              hover:-translate-y-[1px]
              hover:opacity-90

              active:scale-95
            "
          >
            {navContactLabel}
          </a>
        </li>
      </ul>
    </nav>
  );
}