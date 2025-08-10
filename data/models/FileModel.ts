import { z } from "zod";

export const FileItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  sizeKb: z.number(),
  type: z.string(),
  createdAt: z.string(),
});

export type FileItem = z.infer<typeof FileItemSchema>;

const FileItemsArraySchema = z.array(FileItemSchema);

export const FileModelSchema = z.object({
  page: z.number(),
  total: z.number(),
  limit: z.number(),
  hasMore: z.boolean(),
  files: FileItemsArraySchema,
});

type FileModel = z.infer<typeof FileModelSchema>;

export default FileModel;
