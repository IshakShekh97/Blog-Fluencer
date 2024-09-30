import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const siteSchema = z.object({
  name: z
    .string({
      required_error: "Site Name is Required",
      invalid_type_error: "Site Name is Required",
    })
    .min(2, {
      message: "Site Name must be at least 2 characters",
    })
    .max(40, {
      message: "Site Name must be at most 40 characters",
    }),
  description: z
    .string({
      required_error: "Description is Required",
      invalid_type_error: "Description is Required",
    })
    .min(3, {
      message: "Description must be at least 3 characters",
    })
    .max(150, {
      message: "Description must be at most 150 characters",
    }),
  subDirectory: z
    .string({
      required_error: "Subdirectory Name is Required",
      invalid_type_error: "Subdirectory Name is Required",
    })
    .min(1, {
      message: "Subdirectory Name must be at least 1 character",
    })
    .max(40, {
      message: "Subdirectory Name must be at most 40 characters",
    }),
});

export const postSchema = z.object({
  title: z
    .string({
      required_error: "Title is Required",
      invalid_type_error: "Title is Required",
    })
    .min(2, {
      message: "Title must be at least 2 characters",
    })
    .max(100, {
      message: "Title must be at most 100 characters",
    }),

  slug: z
    .string({
      required_error: "Slug is Required",
      invalid_type_error: "Slug is Required",
    })
    .min(1, {
      message: "Slug must be at least 1 character",
    })
    .max(40, {
      message: "Slug must be at most 40 characters",
    }),

  coverImageUrl: z
    .string({
      required_error: "Cover Image is Required",
      invalid_type_error: "Cover Image is Required",
    })
    .min(1, {
      message: "Cover Image must be at least 1 character",
    }),
  smallDescription: z
    .string({
      required_error: "Description is Required",
      invalid_type_error: "Description is Required",
    })
    .min(3, {
      message: "Description must be at least 3 characters",
    })
    .max(350, {
      message: "Description must be at most 350 characters",
    }),
  articleContent: z
    .string({
      required_error: "Content is Required",
      invalid_type_error: "Content is Required",
    })
    .min(3, {
      message: "Content must be at least 3 characters",
    }),
});

export function SiteCreationSchema(options?: {
  isSubDirectoryUnique: () => Promise<boolean>;
}) {
  return z.object({
    subDirectory: z
      .string({
        required_error: "Subdirectory Name is Required",
        invalid_type_error: "Subdirectory Name is Required",
      })
      .min(1, {
        message: "Subdirectory Name must be at least 1 character",
      })
      .max(40, {
        message: "Subdirectory Name must be at most 40 characters",
      })
      .regex(/^[a-z-]+$/, {
        message: "Subdirectory Name must be lowercase letters and hyphens only",
      })
      .transform((value) => value.toLowerCase())
      .pipe(
        z.string().superRefine((email, ctx) => {
          if (typeof options?.isSubDirectoryUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });

            return;
          }

          return options.isSubDirectoryUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "Subdirectory Name is already taken ...",
              });
            }
          });
        })
      ),
    name: z
      .string({
        required_error: "Site Name is Required",
        invalid_type_error: "Site Name is Required",
      })
      .min(2, {
        message: "Site Name must be at least 2 characters",
      })
      .max(40, {
        message: "Site Name must be at most 40 characters",
      }),
    description: z
      .string({
        required_error: "Description is Required",
        invalid_type_error: "Description is Required",
      })
      .min(3, {
        message: "Description must be at least 3 characters",
      })
      .max(150, {
        message: "Description must be at most 150 characters",
      }),
  });
}
