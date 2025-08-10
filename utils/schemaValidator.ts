import { ZodArray, ZodObject } from "zod";

export function schemaValidator<T>(schema: ZodObject | ZodArray, data: T) {
  return schema.parse(data) as T;
}
