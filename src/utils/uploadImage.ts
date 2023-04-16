import type { StorageError } from '@supabase/storage-js';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';

export type UploadResult = {
	path: string;
	error: StorageError | null;
};

export function upload(files: File[]): Promise<UploadResult[]> {
	const result = Promise.all(
		files.map(async (file) => {
			const { data, error } = await supabase.storage
				.from('products')
				.upload(`public/${uuidv4()}`, file);
			if (error) {
				return { path: '', error };
			}
			return { path: data.path ?? '', error: null };
		})
	);
	return result;
}

export async function update(
	files: File[],
	oldPath: string[]
): Promise<UploadResult[]> {
	await supabase.storage.from('products').remove(oldPath);
	return upload(files);
}
