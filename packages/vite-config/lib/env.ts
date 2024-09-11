export const isDev = process.env.CLI_CEB_DEV === 'true';
export const isProduction = !isDev;
