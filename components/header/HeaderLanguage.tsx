import LANG_OPTIONS from "@/data/langOptions";

type HeaderLanguageProps = {
  lang: string;
  setLang: (lang: string) => void;
};

export default function HeaderLanguage({
  lang,
  setLang,
}: HeaderLanguageProps) {
  return (
    <div className="flex items-center rounded-full border border-black/10 bg-white/70 backdrop-blur-md p-1 shadow-sm">
      {LANG_OPTIONS.map((option) => {
        const isActive = lang === option.key;

        return (
          <button
            key={option.key}
            type="button"
            onClick={() => setLang(option.key)}
            className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
              isActive
                ? "bg-black text-white shadow"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}