import { z } from 'zod';

export const inputElementSchema = z.object({
  type: z.literal('input'),
  name: z.string().min(1, 'Input name is required'),
  placeholder: z.string().optional(),
});

export const buttonElementSchema = z.object({
  type: z.literal('button'),
  label: z.string().min(1, 'Button label is required'),
});

export const divElementSchema: any = z.lazy(() =>
  z.object({
    type: z.literal('div'),
    header: z.string().optional(),
    children: z.array(uiElementSchema).optional(),
  })
);

export const uiElementSchema = z.union([
  divElementSchema,
  inputElementSchema,
  buttonElementSchema,
]);

export const uiSchemaValidator = z.array(uiElementSchema).min(1, 'Schema must contain at least one element');

export const saveUIRequestSchema = z.object({
  uiName: z
    .string()
    .min(1, 'UI name is required')
    .max(100, 'UI name must be less than 100 characters')
    .regex(/^[a-zA-Z0-9-_]+$/, 'UI name can only contain alphanumeric characters, hyphens, and underscores'),
  schema: uiSchemaValidator,
});

export type SaveUIRequest = z.infer<typeof saveUIRequestSchema>;

