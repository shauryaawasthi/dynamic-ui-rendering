import { z } from 'zod';
import type { UISchema } from '../types/schema';

// Zod schemas for client-side validation
const inputElementSchema = z.object({
  type: z.literal('input'),
  name: z.string().min(1, 'Input name is required'),
  placeholder: z.string().optional(),
});

const buttonElementSchema = z.object({
  type: z.literal('button'),
  label: z.string().min(1, 'Button label is required'),
});

const divElementSchema: any = z.lazy(() =>
  z.object({
    type: z.literal('div'),
    header: z.string().optional(),
    children: z.array(uiElementSchema).optional(),
  })
);

const uiElementSchema = z.union([
  divElementSchema,
  inputElementSchema,
  buttonElementSchema,
]);

const uiSchemaValidator = z.array(uiElementSchema).min(1, 'Schema must contain at least one element');

export const validateUISchema = (schema: unknown): { valid: boolean; error?: string; data?: UISchema } => {
  try {
    const validated = uiSchemaValidator.parse(schema);
    return { valid: true, data: validated as UISchema };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return { 
        valid: false, 
        error: `${firstError.path.join('.')}: ${firstError.message}` 
      };
    }
    return { valid: false, error: 'Invalid schema format' };
  }
};

export const validateUIName = (name: string): { valid: boolean; error?: string } => {
  if (!name) {
    return { valid: false, error: 'UI name is required' };
  }
  if (name.length > 100) {
    return { valid: false, error: 'UI name must be less than 100 characters' };
  }
  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    return { valid: false, error: 'UI name can only contain alphanumeric characters, hyphens, and underscores' };
  }
  return { valid: true };
};

