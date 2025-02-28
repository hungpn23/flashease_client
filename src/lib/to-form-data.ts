export function convertToFormData<O extends Record<string, any>>(
  obj: O,
): FormData {
  const formData = new FormData();

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const isObject = typeof value === "object" && value !== null;

    formData.append(key, isObject ? JSON.stringify(value) : value);
  });

  return formData;
}
