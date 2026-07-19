type SectionHeadingProps = {
  kicker: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
};

export function SectionHeading({ align = "left", copy, kicker, title }: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      <span className="section-kicker">{kicker}</span>
      <h1>{title}</h1>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}
