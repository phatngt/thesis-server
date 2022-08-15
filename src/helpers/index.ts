export const auditAdd = (user?: any) => ({
  add_by: user,
  add_on: new Date()
})
