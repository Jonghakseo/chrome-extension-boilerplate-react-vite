import { createWriteStream, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join, posix, resolve } from 'node:path';
import { unzipSync, Zip } from 'fflate';
import fg from 'fast-glob';
import { streamFileToZip } from '@extension/shared';

export function upZipAndDelete(zipFilePath: string, destPath: string) {
  const unzipped = unzipSync(readFileSync(zipFilePath));
  mkdirSync(destPath, { recursive: true });

  for (const [filename, fileData] of Object.entries(unzipped)) {
    const filePath = join(destPath, filename);
    const dir = dirname(filePath);

    mkdirSync(dir, { recursive: true });
    writeFileSync(filePath, fileData);
  }
  unlinkSync(zipFilePath);
}

export async function zipFolder(folderPath: string, out: string) {
  const fileList = await fg(['**/*', '!node_modules', '!dist'], { cwd: folderPath, onlyFiles: true });
  const output = createWriteStream(out);

  return new Promise<void>((resolvePromise, rejectPromise) => {
    const zip = new Zip((err, data, final) => {
      if (err) {
        rejectPromise(err);
      } else {
        output.write(data);
        if (final) {
          output.end();
          resolvePromise();
          console.log(`Archive created at: ${out} for recovery`);
        }
      }
    });

    for (const file of fileList) {
      const absPath = resolve(folderPath, file);
      const relPosixPath = posix.relative(folderPath, absPath);

      console.log(`Archiving file: ${relPosixPath}`);
      streamFileToZip(
        absPath,
        relPosixPath,
        zip,
        () => {
          output.end();
          rejectPromise(new Error('Aborted'));
        },
        rejectPromise,
      );
    }

    zip.end();
  });
}
