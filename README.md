# Nixtla Tracker

This is a NextJS app with FastAPI as a backend service.

## Getting Started

### Install dependencies

```
npm install
```

### Run development server


```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Commands

* `fastapi-dev`: run FastAPI application.
* `next-dev`: run NextJS application.
* `dev`: run both application (FastAPI and NextJS) at the same time.

## env file

create a new file `.env` in the root directory copy and replace the values of `GITHUB_ACCESS_TOKEN` and `NIXTLA_API_KEY` of the next block.

```
GITHUB_ACCESS_TOKEN=<GITHUB_ACCESS_TOKEN>
MONGODB_ACCESS_URL=mongodb+srv://nixtla:prfCYFJscmVwn3Fp@clusternixtlatracker.jyov12n.mongodb.net/trackerDB?retryWrites=true&w=majority
NIXTLA_API_KEY=<NIXTLA_API_KEY>
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
