import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DAo Calculator",
    short_name: "DAo·calc",
    description:
      "Convert Daylight Factor into Overcast Daylight Autonomy (DAo & DAo.con).",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1422",
    theme_color: "#0e1422",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
