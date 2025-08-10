import { projects } from "@/mock/data/datasource";
import { NextRequest } from "next/server";

interface Params {
  params: Promise<{
    projectid: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  const { projectid } = await params;

  const project = projects.find((p) => p.id === projectid);
  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }
  return Response.json(project, { status: 200 });
}
