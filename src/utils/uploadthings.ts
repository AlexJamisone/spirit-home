import { generateComponents } from '@uploadthing/react';

import type { OurFileRouter } from '~/server/uploadthings';

export const { UploadButton, UploadDropzone, Uploader } =
	generateComponents<OurFileRouter>();
