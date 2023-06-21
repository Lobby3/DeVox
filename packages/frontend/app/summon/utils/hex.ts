export const hexadecimalize = (value?: number | string) =>
  value ? `0x${value.toString(16)}` : undefined;
    