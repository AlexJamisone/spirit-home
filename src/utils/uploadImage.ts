import type { StorageError } from '@supabase/storage-js';
import type { ChangeEvent } from 'react';
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

type Result = {
	data: { path: string } | null;
	error: StorageError | null;
};

export type UploadResult = {
	path: string;
	error: StorageError | null;
};

export async function uploadDrop(files: File[]): Promise<UploadResult[]> {
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

export async function updateImage(
	files: File[],
	oldName: string[]
): Promise<Result[]> {
	// const { data: existingIMG } = await supabase.storage
	// 	.from('products')
	// 	.list(`public`);
	// console.log(existingIMG);
	// const findFile = existingIMG?.filter((item) =>
	// 	oldName.map((oldName) => item.name === oldName)
	// );
	await supabase.storage.from('products').remove(oldName);
	const result = Promise.all(
		files.map(async (file) => {
			const { data, error } = await supabase.storage
				.from('products')
				.upload(`public/${uuidv4()}`, file);
			return { data, error };
		})
	);
	return result;
}
