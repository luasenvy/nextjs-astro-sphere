declare namespace NodeJS {
  interface ProcessEnv {
    // Site Configurations
    SITE_TITLE: string;
    SITE_DESCRIPTION: string;

    /**
     * @example "https://nextjs-astro-sphere.luas.kr"
     */
    SITE_BASEURL: string;

    // Author Configurations
    AUTHOR_NAME: string;
    AUTHOR_EMAIL: string;
    AUTHOR_LINK: string;
    // Base64 Image Format or URL
    AUTHOR_AVATAR: string;

    // Welcome Page Configurations
    WELCOME_CAPTION: string;
    WELCOME_TITLE: string;
    WELCOME_SUBTITLE: string;
    WELCOME_PRIMARY_TEXT: string;
    WELCOME_SECONDARY_TEXT: string;
    WELCOME_INTRODUCE: string;

    // Skill Stacks Configurations
    /**
     * list of skils
     *
     * @description separated ":" name and link by ";"
     *
     * @example "JavaScript:https://www.javascript.com;TypeScript:https://typescriptlang.org/"
     */
    STACKS: string;

    // Social Links Configurations
    /**
     * @example "GitHub:https://github.com/luasenvy"
     */
    SOCIAL_GITHUB: string;

    /**
     * @example "LinkedIn:https://www.linkedin.com/in/%EB%AF%BC%EA%B7%9C-%EC%95%88-102403230/"
     */
    SOCIAL_LINKEDIN: string;

    /**
     * @example "X:https://x.com/luasenvy"
     */
    SOCIAL_X: string;

    // Logo Configurations
    // Base64 Image Format or URL
    LOGO_LIGHT: string;
    // Base64 Image Format or URL
    LOGO_DARK: string;

    // Pagination Configurations
    /**
     * number of posts per page
     *
     * @default 10
     */
    PGN_SIZE: string;
  }
}
