import { WebSocketServer, WebSocket } from "ws";
import chokidar from "chokidar";
import { clearTimeout } from "timers";

const PORT = 8081;
const wss = new WebSocketServer({ port: PORT });

const wsSet: Set<WebSocket> = new Set();

console.log("ws server:" + PORT);

wss.on("connection", (ws) => {
  ws.addEventListener("message", (event) => {
    switch (event.data) {
      case "add":
        return wsSet.add(ws);
      case "remove":
        return wsSet.delete(ws);
    }
  });
});

let timer: NodeJS.Timeout;
const DELAY = 200;
chokidar.watch("dist").on("all", () => {
  clearTimeout(timer);
  // debounce
  timer = setTimeout(() => {
    wsSet.forEach((ws) => ws.send("update"));
  }, DELAY);
});
