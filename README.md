# nextjs-astro-sphere

![Overview](./overview.webp)

[Astro Sphere Theme](https://github.com/markhorn-dev/astro-sphere) for [Next.js](https://nextjs.org/)<sub>(14+ App Router)</sub>

## Tested Environment

- debian - bookworm
- nodejs - v20.17.0
- npm - 10.8.3

## npm commands

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | `rm -rf .next && next build`                       |
| `npm run start`        | `next start`                                       |
| `npm run lint`         | `next lint`                                        |

## start server

### with docker

1. write your own posts in `/public/posts`
2. set your own server environment to `.env.production`
3. execute command `NODE_ENV=production; npm run build`
4. make docker `docker build -t "$IMAGE_NAME:$IMAGE_TAG" .`
5. run docker `docker run --env-file .env.production $IMAGE_NAME:$IMAGE_TAG`
  - or set docker environment to `docker-compose.yml` and run `docker compose up -d`

### without docker

1. move to `cd .next/standalone` after build 
2. export `.env.production`
3. run `node server.js`

## Posts Directory Structure

every mdx is basically blog posts and you can categorize the post series by directory except `Reserved Directory`.

### Reserved Directory

- careers: show in careers page
- projects: show in projects page
  - series categories available in projects directory.
- legals: terms and privacy

### Example Directory Structure

- careers/
  - apple.mdx
  - google.mdx
  - microsoft.mdx
  - nvidia.mdx
- legals/
  - terms.mdx
  - privacy.mdx
- projects/
  - project-series-1/
    - project-series-1-post-1.mdx
    - project-series-1-post-2.mdx
  - project-post-1.mdx
  - project-post-2.mdx
- post-series-1/
  - post-series-1-post-1.mdx
  - post-series-1-post-2.mdx
  - post-series-1-post-3.mdx
- post-1.mdx
- post-2.mdx
- post-3.mdx

### Troubleshooting

#### post with image

image must place in "/public" directory. and use without `/public` path. image src must be absolute url.

e.g. place image file `/public/image.jpg` and use in markdown `![image alt](/image.jpg)`

#### Multi threads

when start server with docker you can set `number of pm2 instances` via environment variable `CLUSTER_INSTANCES`.

if without docker, you need to server runtime setting like [pm2](https://pm2.keymetrics.io/)

#### There is no volumes in docker

another word: `cannot update posts without build`

In this version, when accessing a URL, the server component replaces the path with slug information, dynamically parsing and directly rendering the corresponding MDX file.

Since Next.js builds include static data required for RSC operation within the build result, dynamic content changes were not possible. The main benefit of this version is the improved loading time in development mode. Parsing MDX files turned out to be more resource-intensive than expected, so in the previous version, even a moderate increase in posts would start to cause performance issues.

To dynamically reflect changes in files and paths within the "posts" directory in a production environment, it seems ideal to forgo SSR component rendering and instead use additional API requests with the fetch() function.

However, a drawback is that pages using 'use client' cannot set Next.js metadata, making it impossible to apply SEO with the current structure. It will require restructuring the relationship between server and client components and adjusting the setup accordingly.
