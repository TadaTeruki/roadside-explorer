export type Config = {
  yolpApiKey: string;
};

export function initConfig() {
  return {
    yolpApiKey: import.meta.env.VITE_YOLP_API_KEY,
  };
}
