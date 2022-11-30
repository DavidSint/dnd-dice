import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  const port = Number(process.env.PORT) ?? 3000;

  return defineConfig({
    server: {
      port,
    },
    preview: {
      port,
    },
    plugins: [react()],
  });
};
