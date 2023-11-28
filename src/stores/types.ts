import type { typeToFlattenedError } from 'zod';

export type ZodError = typeToFlattenedError<any, string>['fieldErrors'];
