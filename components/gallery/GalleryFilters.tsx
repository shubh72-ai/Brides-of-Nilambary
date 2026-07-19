"use client";

export function GalleryFilters({
  categories,
  onChange,
  value,
}: {
  categories: string[];
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div className="gallery-filters" role="tablist" aria-label="Gallery filters">
      {["All Looks", ...categories].map((category) => (
        <button
          aria-selected={value === category}
          className={value === category ? "selected" : ""}
          key={category}
          onClick={() => onChange(category)}
          role="tab"
          type="button"
        >
          {category}
        </button>
      ))}
    </div>
  );
}
