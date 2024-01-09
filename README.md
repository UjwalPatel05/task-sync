
# TaskSync

TaskSync is a Fullstack Full Stack Application built with Next.js 14, featuring seamless integration of Server Actions, React, Prisma, Stripe, and MySQL. 


## Features

- Authenication Using Clerk API
- Organizations / Workspaces Creation and Management
- Create Board
- Unsplash API for random beautiful cover images
- Activity log
- List and Card creation
- Rename, delete, drag & drop reorder and copy functionality for Card and List
- Board limit for every organization
- Stripe subscription for each organization to unlock unlimited 
- MySQL DB & Prisma ORM
- shadcnUI & TailwindCSS for responsive application


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

`CLERK_SECRET_KEY`

`NEXT_PUBLIC_CLERK_SIGN_IN_URL`

`NEXT_PUBLIC_CLERK_SIGN_UP_URL`

`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`

`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`

`NEXT_PUBLIC_UNSPLASH_ACCESS_KEY`

`DATABASE_URL`

`STRIPE_API_KEY`

`NEXT_PUBLIC_APP_URL`

`STRIPE_WEBHOOK_SECRET`

## Run Locally

Clone the project

```bash
  git clone https://github.com/UjwalPatel05/task-sync.git
```

Install dependencies

```bash
  npm install
```

Setup .env file
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY

NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

DATABASE_URL
NEXT_PUBLIC_APP_URL

STRIPE_API_KEY
STRIPE_WEBHOOK_SECRET
```

Setup Prisma - Add MySQL Database - I used PlanetScale

```bash
npx prisma generate
npx prisma db push
```

Start the server

```bash
  npm run dev
```


## Demo

[Demo App Video](https://drive.google.com/file/d/1s6_qSbo_GqdWVcBstUPUbdn6NjhXgNKI/view?usp=sharing)


## Screenshots

![Dashboard](https://res.cloudinary.com/djstjnl11/image/upload/v1704825843/j4yrzvfcjafax7b7tdjf.png)

![Task List](https://res.cloudinary.com/djstjnl11/image/upload/v1704825843/fd28vlrqjynptc2scjs3.png)

![Card Description](https://res.cloudinary.com/djstjnl11/image/upload/v1704825843/uvpotu3mn08e7st3r8nv.png)

![Payment Gateway](https://res.cloudinary.com/djstjnl11/image/upload/v1704826163/xl9iwqhcyot8vfc6pzrk.png)

## Tech Stack

**Client:** Next 14, React, TailwindCSS, Shadcn UI

**Server:** Prisma ORM, MySQL DB

**API:** Stripe (Payment), Clerk (Authentication and Organization), Unsplash (Images)

