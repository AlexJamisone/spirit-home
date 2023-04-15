import type { ChangeEvent } from 'react';
import { supabase } from './supabase';
import type { StorageError } from '@supabase/storage-js';
import { DropEvent } from 'react-dropzone';

type Result = {
	data: { path: string } | null;
	error: StorageError | null;
};

export function updateDrop(files: File[]) {
		const result = Promise.all(
			files.map(async (file) => {
				const { data, error } = await supabase.storage
					.from('products')
					.upload(`${Date.now().toString()}`, file);
				return { data, error };
			})
		);
		return result;
}

export async function uploadImages(
	file: File | undefined,
	e: ChangeEvent<HTMLInputElement>
): Promise<Result> {
	if (e.target.files) {
		file = e.target.files[0];
	}
	const { data, error } = await supabase.storage
		.from('products')
		.upload(`public/${Date.now().toString()}`, file as File, {
			upsert: true,
		});
	return { data, error };
}

export async function updateImage(
	file: File | undefined,
	e: ChangeEvent<HTMLInputElement>,
	oldPath: string
): Promise<Result> {
	if (e.target.files) {
		file = e.target.files[0];
	}
	const { data: existingIMG } = await supabase.storage
		.from('products')
		.list(`public`);
	console.log(existingIMG);
	const findFile = existingIMG?.filter((item) => item.name === file?.name);
	console.log(findFile);
	if (findFile?.length === 0) {
		const { data, error } = await supabase.storage
			.from('products')
			.upload(`public/${file?.name as string}`, file as File);
		return { data, error };
	}
	await supabase.storage.from('products').remove([oldPath]);
	const { data, error } = await supabase.storage
		.from('products')
		.upload(`public/${file?.name as string}`, file as File, {
			upsert: true,
		});
	return { data, error };
}
