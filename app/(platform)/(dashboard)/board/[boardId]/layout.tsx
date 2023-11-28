import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import React from "react";
import BoardNavbar from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  const { boardId } = params;
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: `Board`,
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });

  return {
    title: `${board?.title}` || "Board",
  };
}

async function BoardIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}) {
  const { orgId } = auth();
  const { boardId } = params;

  if (!orgId) {
    redirect("/select-ord");
  }

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }
  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className="relative h-full bg-cover bg-center bg-no-repeat"
    >
        <BoardNavbar data={board}/>
        <div className="absolute inset-0 bg-black/10"/>
      <main className="relative h-full pt-28">{children}</main>
    </div>
  );
}

export default BoardIdLayout;
