import { projectFiles } from "@/mock/data/datasource";
import { NextRequest } from "next/server";

interface Params {
  params: Promise<{
    projectid: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get("page") || "1";
  const limitParam = url.searchParams.get("limit") || "10";
  const page = parseInt(pageParam, 10);
  const limit = parseInt(limitParam, 10);
  const { projectid } = await params;

  const files = projectFiles[projectid as keyof typeof projectFiles];

  if (!files) {
    return Response.json(
      { error: "Project or files not found" },
      { status: 404 }
    );
  }

  const start = (page - 1) * limit;
  const paginatedFiles = files.slice(start, start + limit);

  // hasMore is true if there are remaining files beyond the current slice
  const hasMore = start + limit < files.length;

  const response = {
    page,
    limit,
    total: files.length,
    files: paginatedFiles,
    hasMore,
  };

  return Response.json(response, { status: 200 });
}
