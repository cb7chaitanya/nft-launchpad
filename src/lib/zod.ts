import { z } from "zod";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/gif"];

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, {
      message: `File size must be less than ${MAX_UPLOAD_SIZE / (1024 * 1024)} MB`,
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "Only PNG, JPEG, and GIF files are allowed",
    }),
  attributes: z.array(
    z.object({
      trait_type: z.string(),
      value: z.string(),
    })
  ).optional(),
  sellerFee: z.number().min(0).max(10000).optional(), // Max 100% fee represented in basis points
  externalUrl: z.string().url().optional(),
});

export default formSchema;
