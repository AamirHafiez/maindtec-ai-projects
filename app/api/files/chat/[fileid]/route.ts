import { chats } from "@/mock/data/datasource";
import { NextRequest } from "next/server";

function generateId() {
  return "chat" + Math.random().toString(36).substring(2, 9);
}

interface Params {
  params: {
    fileid: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get("page") || "1";
  const limitParam = url.searchParams.get("limit") || "10";
  const page = parseInt(pageParam, 10);
  const limit = parseInt(limitParam, 10);
  const { fileid } = params;
  const chatHistory = chats[fileid];
  if (!chatHistory) {
    return Response.json({ error: "Chat for file not found" }, { status: 404 });
  }
  const total = chatHistory.length;
  const start = (page - 1) * limit;
  const paginatedChats = chatHistory.slice(start, start + limit);
  const hasMore = start + limit < total;
  return Response.json(
    {
      page,
      limit,
      total,
      chats: paginatedChats,
      hasMore,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest, { params }: Params) {
  const { fileid } = params;
  if (!fileid) {
    return Response.json({ error: "fileid is required" }, { status: 400 });
  }
  const body = await request.json();
  if (
    !body?.content ||
    typeof body.content !== "string" ||
    body.content.trim() === ""
  ) {
    return Response.json(
      { error: "Content is required and must be a non-empty string" },
      { status: 400 }
    );
  }
  if (!chats[fileid]) {
    chats[fileid] = [];
  }
  const userMsg = {
    id: generateId(),
    sender: "user" as const,
    content: body.content.trim(),
    timestamp: new Date().toISOString(),
  };
  chats[fileid].unshift(userMsg); // Add newest first

  const aiMsg = {
    id: generateId(),
    sender: "ai" as const,
    content: `AI Response: You said "${body.content.trim()}"`,
    timestamp: new Date().toISOString(),
  };
  chats[fileid].unshift(aiMsg);
  return Response.json({ messages: [userMsg, aiMsg] }, { status: 201 });
}
