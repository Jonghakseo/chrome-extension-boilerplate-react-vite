import { streamFileToZip } from '@extension/dev-utils';
import fg from 'fast-glob';
import { Zip } from 'fflate';
import { createWriteStream, existsSync, mkdirSync } from 'node:fs';
import { posix, resolve } from 'node:path';

const toMB = (bytes: number): number => bytes / 1024 / 1024;

const ensureBuildDirectoryExists = (buildDirectory: string): void => {
  if (!existsSync(buildDirectory)) {
    mkdirSync(buildDirectory, { recursive: true });
  }
};

const logPackageSize = (size: number, startTime: number): void => {
  console.log(`Zip Package size: ${toMB(size).toFixed(2)} MB in ${Date.now() - startTime}ms`);
};

export const zipBundle = async (
  {
    distDirectory,
    buildDirectory,
    archiveName,
  }: {
    distDirectory: string;
    buildDirectory: string;
    archiveName: string;
  },
  withMaps = false,
): Promise<void> => {
  ensureBuildDirectoryExists(buildDirectory);

  const zipFilePath = resolve(buildDirectory, archiveName);
  const output = createWriteStream(zipFilePath);

  const fileList = await fg(
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

    for (const file of fileList) {
      if (aborted) return;

      const absPath = resolve(distDirectory, file);
      const absPosixPath = posix.resolve(distDirectory, file);
      const relPosixPath = posix.relative(distDirectory, absPosixPath);

      console.log(`Adding file: ${relPosixPath}`);
      streamFileToZip(
        absPath,
        relPosixPath,
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
