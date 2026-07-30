/**
 * Responsive <picture> renderer for build-time optimised assets.
 * Variants live in src/assets/opt/<stem>-<width>.{avif,webp} and are resolved
 * eagerly as URLs so there is zero runtime fetching / layout cost.
 */

const avifMods = import.meta.glob("../assets/opt/*.avif", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const webpMods = import.meta.glob("../assets/opt/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

type Variant = { w: number; url: string };
type Entry = { avif: Variant[]; webp: Variant[] };

function build(mods: Record<string, string>) {
  const out: Record<string, Variant[]> = {};
  for (const [path, url] of Object.entries(mods)) {
    const file = path.split("/").pop()!;
    const base = file.replace(/\.(avif|webp)$/, "");
    const m = base.match(/^(.*)-(\d+)$/);
    if (!m) continue;
    (out[m[1]] ||= []).push({ w: Number(m[2]), url });
  }
  for (const list of Object.values(out)) list.sort((a, b) => a.w - b.w);
  return out;
}

const AVIF = build(avifMods);
const WEBP = build(webpMods);

export function getEntry(name: string): Entry {
  return { avif: AVIF[name] ?? [], webp: WEBP[name] ?? [] };
}

/** Largest webp URL — useful for og:image / preload hints. */
export function picUrl(name: string): string {
  const list = WEBP[name] ?? [];
  return list.length ? list[list.length - 1].url : "";
}

/** Smallest-but-sane webp URL for a preload hint at a given max width. */
export function picUrlAt(name: string, width: number): string {
  const list = WEBP[name] ?? [];
  if (!list.length) return "";
  return (list.find((v) => v.w >= width) ?? list[list.length - 1]).url;
}

export function picAvifAt(name: string, width: number): string {
  const list = AVIF[name] ?? [];
  if (!list.length) return "";
  return (list.find((v) => v.w >= width) ?? list[list.length - 1]).url;
}

const srcset = (list: Variant[]) => list.map((v) => `${v.url} ${v.w}w`).join(", ");

type PicProps = {
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
  title?: string;
  priority?: boolean;
};

export function Pic({
  name,
  alt,
  className,
  sizes = "100vw",
  width,
  height,
  title,
  priority = false,
}: PicProps) {
  const { avif, webp } = getEntry(name);
  const fallback = webp.length ? webp[webp.length - 1].url : "";

  return (
    <picture style={{ display: "contents" }}>
      {avif.length > 0 && <source type="image/avif" srcSet={srcset(avif)} sizes={sizes} />}
      {webp.length > 0 && <source type="image/webp" srcSet={srcset(webp)} sizes={sizes} />}
      <img
        src={fallback}
        alt={alt}
        title={title}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
