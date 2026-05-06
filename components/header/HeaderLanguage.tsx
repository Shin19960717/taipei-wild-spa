"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";

import LANG_OPTIONS from "@/data/langOptions";
import { getSafeLang } from "@/lib/i18n";

const VALID_LANGS = ["zh", "en", "ja", "ko"];

type HeaderLanguageProps = {
  mobile?: boolean;
  onSelect?: () => void;
};

export default function HeaderLanguage({
  mobile = false,
  onSelect,
}: HeaderLanguageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentLang = getSafeLang(params?.lang);

  const currentOption = useMemo(() => {
    return (
      LANG_OPTIONS.find((item) => item.key === currentLang) ??
      LANG_OPTIONS[0]
    );
  }, [currentLang]);

  const handleSwitchLang = (nextLang: string) => {
    if (!pathname) return;

    const segments = pathname.split("/").filter(Boolean);

    if (
      segments.length > 0 &&
      VALID_LANGS.includes(segments[0])
    ) {
      segments[0] = nextLang;
    } else {
      segments.unshift(nextLang);
    }

    const newPath = "/" + segments.join("/");

    router.replace(newPath);

    onSelect?.();
  };

  // ===== Mobile Panel =====

  if (mobile) {
    return (
      <div className="w-[200px] rounded-[36px] bg-[#f3f0ef] p-5 shadow-2xl border border-black/5">
        <div className="mb-1 px-1 text-xs tracking-[0.35em] text-[#8e8682]">
          LANGUAGE
        </div>

        <div className="flex flex-col gap-3">
          {LANG_OPTIONS.map((option) => {
            const active = option.key === currentLang;

            return (
              <button
                key={option.key}
                onClick={() => handleSwitchLang(option.key)}
                className={`
                  group
                  flex
                  items-center
                  justify-between
                  rounded-[28px]
                  px-1
                  py-0
                  transition-all
                  duration-300
                  ${
                    active
                      ? "bg-black text-white shadow-xl"
                      : "bg-transparent hover:bg-white"
                  }
                `}
              >
                <span className="text-[15px] font-medium">
                  {option.label}
                </span>

                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    text-sm
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      active
                        ? "bg-white/15 text-white"
                        : "bg-white text-[#7d7671]"
                    }
                  `}
                >
                  {option.key.toUpperCase()}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ===== Desktop =====

  return (
    <div className="flex items-center rounded-full border border-black/10 bg-white/80 p-1 backdrop-blur-md shadow-sm">
      {LANG_OPTIONS.map((option) => {
        const active = option.key === currentLang;

        return (
          <button
            key={option.key}
            onClick={() => handleSwitchLang(option.key)}
            className={`
              rounded-full
              px-2
              py-2
              text-sm
              font-medium
              transition-all
              duration-300
              ${
                active
                  ? "bg-black text-white shadow-md"
                  : "text-black/70 hover:bg-black/5"
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}