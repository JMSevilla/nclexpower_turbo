export const setItem = <T>(key: string, value: T) => {
  try {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    process.env.NODE_ENV !== "test" && console.log(error);
  }
};

export const getItem = <T>(key: string): T | undefined => {
  try {
    if (typeof window !== "undefined") {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    }
  } catch (error) {
    process.env.NODE_ENV !== "test" && console.log(error);
  }

  return undefined;
};

export const removeItem = (key: string) => {
  try {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(key);
    }
  } catch (error) {
    process.env.NODE_ENV !== "test" && console.log(error);
  }
};

export const clear = () => {
  if (typeof window !== "undefined") {
    window.sessionStorage.clear();
  }
};
