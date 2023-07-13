export const setLocalStorageItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error storing item in local storage:", error);
  }
};

export const getLocalStorageItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error retrieving item from local storage:", error);
    return null;
  }
};

export const updateLocalStorageItem = (key: string, value: any) => {
  try {
    const existingItem = getLocalStorageItem(key);
    if (existingItem) {
      const updatedItem = { ...existingItem, ...value };
      setLocalStorageItem(key, updatedItem);
    }
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
