export default function ServicesTags({ t }) {
  const tags = [t.serviceTag1, t.serviceTag2, t.serviceTag3];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 bg-stone-200 rounded-full text-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}