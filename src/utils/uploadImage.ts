import type { ChangeEvent } from 'react';
import { supabase } from './supabase';
import type { StorageError } from '@supabase/storage-js';

interface UploadResult {
	data: { path: string } | null;
	error: StorageError | null;
}

export async function uploadImages(
	file: File | undefined,
	e: ChangeEvent<HTMLInputElement>
): Promise<UploadResult> {
	if (e.target.files) {
		file = e.target.files[0];
	}
	const { data, error } = await supabase.storage
		.from('products')
		.upload(`public/${file?.name as string}`, file as File);
	return { data, error };
}
