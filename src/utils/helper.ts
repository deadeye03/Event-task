export const successResponse = (data: any) => {
  return {
    status: 1,
    data,
  };
};

export const errorResponse = (message: string) => {
  return {
    status: 0,
    error: message,
  };
};

export const parseId = (id: string | string[] | undefined): number | null => {
  if (!id) return null;
  const idValue = Array.isArray(id) ? id[0] : id;
  const parsedId = Number.parseInt(idValue, 10);
  return Number.isNaN(parsedId) ? null : parsedId;
};
