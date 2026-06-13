let loadingCount = 0;

const listeners: ((loading: boolean) => void)[] = [];

export const loadingStore = {
  show: () => {
    loadingCount++;
    notify();
  },

  hide: () => {
    loadingCount = Math.max(loadingCount - 1, 0);
    notify();
  },

  subscribe: (cb: (loading: boolean) => void) => {
    listeners.push(cb);
  },
};

function notify() {
  const isLoading = loadingCount > 0;
  listeners.forEach((cb) => cb(isLoading));
}
