import { z } from "zod";

export const ProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string().optional(),
  email: z.email(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.url().optional(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  joinedDate: z.string().optional(),
  socialLinks: z
    .object({
      twitter: z.url().optional(),
      linkedin: z.url().optional(),
      github: z.url().optional(),
      facebook: z.url().optional(),
    })
    .optional(),
});

export type ProfileModel = z.infer<typeof ProfileSchema>;
export default ProfileModel;
