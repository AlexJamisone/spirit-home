import type { ChangeEvent } from 'react';
import { supabase } from './supabase';
import type { StorageError } from '@supabase/storage-js';

type Result = {
	data: { path: string } | null;
	error: StorageError | null;
};

export async function uploadImages(
	file: File | undefined,
	e: ChangeEvent<HTMLInputElement>
): Promise<Result> {
	if (e.target.files) {
		file = e.target.files[0];
	}
	const { data, error } = await supabase.storage
		.from('products')
		.upload(`public/${file?.name as string}`, file as File, {
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
		.update(oldPath, file as File);
	await supabase.storage
		.from('products')
		.remove([existingIMG?.path as string]);
	const { data, error } = await supabase.storage
		.from('products')
		.upload(`public/${file?.name as string}`, file as File, {upsert: true});
	return { data, error };
}
