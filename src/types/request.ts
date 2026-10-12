import { z } from "zod";

const UUID_VERSIONS = [1, 2, 3, 4];
const UUID_NAMESPACE_ALIASES = ["dns", "url", "oid", "x500"];
const UUID_V2_DOMAINS = ["person", "group", "org", "domain"];
const UUID_FORMAT = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
const UUID_NODE_FORMAT = /^[0-9a-fA-F]{12}$/;

export const UuidSchema = z
  .object({
    version: z.number().int().optional(),
    namespace: z.string().optional(),
    name: z.string().optional(),
    domain: z.string().optional(),
    id: z.number().int().optional(),
    node: z.string().regex(UUID_NODE_FORMAT).optional(),
    msecs: z.number().int().optional(),
  })
  .superRefine((body, ctx) => {
    const version = body.version ?? 4;

    if (!UUID_VERSIONS.includes(version)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["version"],
        message: "version harus 1, 2, 3, atau 4",
      });
      return;
    }

    if (version === 3) {
      if (!body.namespace || !body.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["version"],
          message: "version 3 butuh body namespace + name",
        });
      } else if (
        !UUID_NAMESPACE_ALIASES.includes(body.namespace.toLowerCase()) &&
        !UUID_FORMAT.test(body.namespace)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["namespace"],
          message: "namespace harus alias dns/url/oid/x500 atau UUID",
        });
      }
    }

    if (version === 2) {
      if (!body.domain || body.id === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["version"],
          message: "version 2 butuh body domain + id",
        });
      } else if (!UUID_V2_DOMAINS.includes(body.domain.toLowerCase())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["domain"],
          message: "domain harus person/group/org/domain",
        });
      }
    }
  });

export const PpidSchema = z.object({
  text: z.string(),
});

export const UniqueSchema = z.object({
  character: z.string().optional(),
  length: z.number().int().optional(),
});

export const PhoneNumberSchema = z.object({
  phone: z.string(),
  country: z.string().optional(),
});

export const GeolocationSchema = z.object({
  ip: z.string().optional(),
});
