export default function ServicesTags({ t }) {
  const tags = [t.serviceTag1, t.serviceTag2, t.serviceTag3];

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-4 py-1.5 rounded-full bg-[rgba(255,249,243,0.78)] text-[rgba(95,75,60,0.62)] text-sm font-light tracking-[0.06em] [text-shadow:0_1px_0_rgba(255,255,255,0.28)] shadow-[0_4px_12px_rgba(80,56,38,0.18)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}