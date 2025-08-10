import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type ProjectModel = z.infer<typeof ProjectSchema>;

export const ProjectModelListSchema = z.array(ProjectSchema);

export default ProjectModel;
