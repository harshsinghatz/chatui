export const setLocalStorageItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error storing item in local storage:", error);
  }
};

export const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error("Error retrieving item from local storage:", error);
    return null;
  }
};

export const updateLocalStorageItem = (key: string, value: any) => {
  try {
    setLocalStorageItem(key, value);
  } catch (error) {
    console.error("Error updating item in local storage:", error);
  }
};

// Function to delete an item from local storage
export const deleteLocalStorageItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error deleting item from local storage:", error);
  }
};
