
export const parseBoolean = (value: string | undefined) => {
  if (!value || !['true', 'false'].includes(value)) return undefined;
  return value === 'true' ? true : false;
}