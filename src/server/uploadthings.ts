import { createUploadthing, type FileRouter } from 'uploadthing/next-legacy';
import { UTApi } from 'uploadthing/server';
const f = createUploadthing();
export const utapi = new UTApi();
export const ourFileRouter = {
	imageUploader: f({
		image: { maxFileCount: 5, maxFileSize: '16MB' },
	}).onUploadComplete(({ file, metadata }) => {
		console.log(file);
		console.log(metadata);
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
