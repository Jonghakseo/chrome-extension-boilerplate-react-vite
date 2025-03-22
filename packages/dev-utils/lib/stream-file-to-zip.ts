import { AsyncZipDeflate } from 'fflate';
import { createReadStream } from 'node:fs';
import type { Zip } from 'fflate';

export const streamFileToZip = (
  absPath: string,
  relPath: string,
  zip: Zip,
  onAbort: () => void,
  onError: (error: Error) => void,
): void => {
  const data = new AsyncZipDeflate(relPath, { level: 1 });
  void zip.add(data);

  createReadStream(absPath)
    .on('data', (chunk: string | Buffer) =>
      typeof chunk === 'string' ? data.push(Buffer.from(chunk), false) : data.push(chunk, false),
    )
    .on('end', () => data.push(new Uint8Array(0), true))
    .on('error', error => {
      onAbort();
      onError(error);
    });
};
