import { createHash } from "crypto";

export const auditAdd = (user?: any) => ({
  createAt: new Date()
});

export const auditUpdate = (user: any) => ({
  updateAt: new Date()
});

export const sha512 = (text: string) => {
  const hash = createHash('sha512');
  hash.update(text);
  return hash.digest('hex').toLowerCase();
};
