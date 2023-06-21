import { createUploadthing, type FileRouter } from 'uploadthing/next-legacy';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({
		image: { maxFileCount: 5, maxFileSize: '16MB' },
	}).onUploadComplete(({ file, metadata }) => {
		console.log(file);
		console.log(metadata);
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
