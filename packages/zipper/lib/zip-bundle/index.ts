import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs';
import { resolve, relative } from 'path';
import glob from 'fast-glob';
import { AsyncZipDeflate, Zip } from 'fflate';

// Converts bytes to megabytes
function toMB(bytes: number): number {
  return bytes / 1024 / 1024;
}

// Creates the build directory if it doesn't exist
function ensureBuildDirectoryExists(buildDirectory: string): void {
  if (!existsSync(buildDirectory)) {
    mkdirSync(buildDirectory, { recursive: true });
  }
}

// Logs the package size and duration
function logPackageSize(size: number, startTime: number): void {
  console.log(`Zip Package size: ${toMB(size).toFixed(2)} MB in ${Date.now() - startTime}ms`);
}

// Handles file streaming and zipping
function streamFileToZip(
  absPath: string,
  relPath: string,
  zip: Zip,
  onAbort: () => void,
  onError: (error: Error) => void,
): void {
  const data = new AsyncZipDeflate(relPath, { level: 9 });
  zip.add(data);

  createReadStream(absPath)
    .on('data', (chunk: Buffer) => data.push(chunk, false))
    .on('end', () => data.push(new Uint8Array(0), true))
    .on('error', error => {
      onAbort();
      onError(error);
    });
}

// Zips the bundle
export const zipBundle = async (
  {
    distDirectory,
    buildDirectory,
    distDirectoryName,
  }: {
    distDirectory: string;
    buildDirectory: string;
    distDirectoryName: string;
  },
  withMaps = false,
): Promise<void> => {
  ensureBuildDirectoryExists(buildDirectory);

  const zipFilePath = resolve(buildDirectory, `${distDirectoryName}.zip`);
  const output = createWriteStream(zipFilePath);

  const fileList = await glob(
    [
      '**/*', // Pick all nested files
      ...(!withMaps ? ['!**/(*.js.map|*.css.map)'] : []), // Exclude source maps conditionally
    ],
    {
      cwd: distDirectory,
      onlyFiles: true,
    },
  );

  return new Promise<void>((pResolve, pReject) => {
    let aborted = false;
    let totalSize = 0;
    const timer = Date.now();
    const zip = new Zip((err, data, final) => {
      if (aborted) return;

      if (err) {
        pReject(err);
      } else {
        totalSize += data.length;
        output.write(data);
        if (final) {
          logPackageSize(totalSize, timer);
          output.end();
          pResolve();
        }
      }
    });

    // Handle file read streams
    for (const file of fileList) {
      if (aborted) return;

      const absPath = resolve(distDirectory, file);
      const relPath = relative(distDirectory, absPath); // Get the relative path
      streamFileToZip(
        absPath,
        relPath, // Use relative path
        zip,
        () => {
          aborted = true;
          zip.terminate();
        },
        error => pReject(`Error reading file ${absPath}: ${error.message}`),
      );
    }

    zip.end();
  });
};
