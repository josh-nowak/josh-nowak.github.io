import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Joshua Nowak",
  EMAIL: "hello@joshuanowak.eu",
  NUM_POSTS_ON_HOMEPAGE: 5,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Joshua Nowak - Bridging psychology and product",
};

export const BLOG: Metadata = {
  TITLE: "Notes & Highlights",
  DESCRIPTION: "A collection of notes and highlights from my work.",
};

// export const PROJECTS: Metadata = {
//   TITLE: "Projects",
//   DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
// };

export const SOCIALS: Socials = [
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/nowakjoshua",
  },
  {
    NAME: "github",
    HREF: "https://github.com/josh-nowak",
  },
  {
    NAME: "bluesky",
    HREF: "https://bsky.app/profile/joshuanowak.eu",
  },
];
