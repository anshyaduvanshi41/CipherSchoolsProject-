export const validateSQL = q =>
  q.trim().toLowerCase().startsWith("select") &&
  !/(drop|delete|update|insert|alter)/i.test(q);