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
NEXT_PUBLIC_API_DOMAIN=<API_DOMAIN>
API_DOMAIN=<API_DOMAIN>
```

## Architecture

### FastAPI

The backend service that provide the data from Github and Pystats. The service use MongoDB as cache, some requests take too time so the data will be stored in mongoDB. 

To review the API you can access to `/docs` url path.

## NextJS and React

The frontend side is made with NextJs and ReactJS, the pages are provided by NextJS the different views are teh following:

* `/compareRepo`: Dashboard to display the stargazers data history from a GitHub Repository.
* `/compareOrg`: Dashboard to display the stargazers data history from a GitHub Organization.
* `/compareDownloads`: Dashboard to display the Package Download data history from a GitHub Repository.

## Deployment

The NextJS application is hosted by Vercel and the FastAPI service is served in a EC2 AWS instance.
