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

1. write your own posts in `./posts`
  - when server is booting always reload all of `.mdx` file
2. set your own server environment to `.env.production`
3. execute command `NODE_ENV=production; npm run build`
4. make docker `docker build -t "$IMAGE_NAME:$IMAGE_TAG" .`
5. run docker `docker run --env-file .env.production $IMAGE_NAME:$IMAGE_TAG`
  - or set docker environment to `docker-compose.yml` and run `docker compose up -d`

#### options

- volume: `/app/posts`
- ports: `3000`

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