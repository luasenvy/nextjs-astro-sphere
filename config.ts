import type { SvgIconComponent } from "@mui/icons-material";
import Email from "@mui/icons-material/Email";
import GitHub from "@mui/icons-material/GitHub";
import LinkedIn from "@mui/icons-material/LinkedIn";
import X from "@mui/icons-material/X";

export const logo = {
  light: process.env.LOGO_LIGHT,
  dark: process.env.LOGO_DARK,
};

export const site = {
  name: process.env.SITE_TITLE,
  description: process.env.SITE_DESCRIPTION,
  baseurl: process.env.SITE_BASEURL,
};

export const welcome = {
  caption: process.env.WELCOME_CAPTION,
  title: process.env.WELCOME_TITLE,
  subtitle: process.env.WELCOME_SUBTITLE,
  primaryLinkText: process.env.WELCOME_PRIMARY_TEXT,
  secondaryLinkText: process.env.WELCOME_SECONDARY_TEXT,
  introduce: process.env.WELCOME_INTRODUCE,
};

export const author = {
  name: process.env.AUTHOR_NAME,
  email: process.env.AUTHOR_EMAIL,
  link: process.env.AUTHOR_LINK,
  avatar: process.env.AUTHOR_AVATAR,
};

interface Social {
  name: string;
  icon: SvgIconComponent;
  text: string;
  href: string;
}

export const social: Array<Social> = [];

if (process.env.AUTHOR_EMAIL?.length) {
  social.push({
    name: "Email",
    icon: Email,
    text: process.env.AUTHOR_EMAIL,
    href: `mailto:${process.env.AUTHOR_EMAIL}`,
  });
}

if (process.env.SOCIAL_GITHUB?.length) {
  const [text, ...href] = process.env.SOCIAL_GITHUB.split(":");
  social.push({ name: "Github", icon: GitHub, text, href: href.join(":") });
}

if (process.env.SOCIAL_LINKEDIN?.length) {
  const [text, ...href] = process.env.SOCIAL_LINKEDIN.split(":");
  social.push({ name: "LinkedIn", icon: LinkedIn, text, href: href.join(":") });
}

if (process.env.SOCIAL_X?.length) {
  const [text, ...href] = process.env.SOCIAL_X.split(":");
  social.push({ name: "X", icon: X, text, href: href.join(":") });
}

export const stack = process.env.STACKS?.split(";").map((stack) => {
  const [text, ...href] = stack.split(":");
  return { text, href: href.join(":") };
});

export const pagination = {
  pageSize: Number(process.env.PGN_SIZE ?? "10"),
};
