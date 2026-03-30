import LANG_OPTIONS from "@/data/langOptions";
import { LANG_BUTTON_BASE } from "@/constants/uiClasses";

type HeaderLanguageProps = {
  lang: string;
  setLang: (lang: string) => void;
};

export default function HeaderLanguage({
  lang,
  setLang,
}: HeaderLanguageProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 w-full">
      {LANG_OPTIONS.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => setLang(option.key)}
          className={`${LANG_BUTTON_BASE} ${
            lang === option.key
              ? "bg-black text-white shadow-md"
              : "bg-white text-black hover:bg-stone-100"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}