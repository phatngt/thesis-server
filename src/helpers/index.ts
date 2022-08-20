import { createHash } from "crypto"

export const auditAdd = (user?: any) => ({
  add_by: user ? user.id : null,
  add_on: new Date()
})

export const auditUpdate = (user: any) => ({
  upd_by: user ? user.id : null,
  upd_on: new Date()
});

export const sha512 = (text: string) => {
  const hash = createHash('sha512')
  hash.update(text)
  return hash.digest('hex').toLowerCase();
}
