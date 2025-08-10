import { projects } from "@/mock/data/datasource";

export async function GET() {
  return Response.json(projects);
}
