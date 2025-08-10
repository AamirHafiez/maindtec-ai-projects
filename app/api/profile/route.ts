import { profile } from "@/mock/data/datasource";

export async function GET() {
  return Response.json(profile);
}
