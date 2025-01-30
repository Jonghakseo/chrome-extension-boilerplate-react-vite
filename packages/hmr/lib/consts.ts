export const LOCAL_RELOAD_SOCKET_PORT = 8081;
export const LOCAL_RELOAD_SOCKET_URL = `ws://localhost:${LOCAL_RELOAD_SOCKET_PORT}`;

export const DO_UPDATE = 'do_update';
export const DONE_UPDATE = 'done_update';
export const BUILD_COMPLETE = 'build_complete';

export const END_SIGNALS = ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGKILL'] as const;
