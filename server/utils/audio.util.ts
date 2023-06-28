import { UploadedFile } from 'express-fileupload';
import { parseBuffer } from 'music-metadata';

export async function getDuration(file: UploadedFile) {
  const metadata = await parseBuffer(file.data, file.mimetype);
  const duration = metadata.format.duration as number;
  return Math.floor(duration);
}

export function getDurations(files: UploadedFile[]) {
  return Promise.all(files.map(getDuration));
}
