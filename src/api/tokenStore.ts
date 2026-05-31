type Listener = (token: string | null) => void;

let accessToken: string | null = null;
const listeners = new Set<Listener>();

export const tokenStore = {
  get: (): string | null => accessToken,

  set: (token: string): void => {
    accessToken = token;
    listeners.forEach((l) => l(token));
  },

  clear: (): void => {
    accessToken = null;
    listeners.forEach((l) => l(null));
  },

  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};