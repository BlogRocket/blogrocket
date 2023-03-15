/** Get env based on environment */
export const getEnv = (env: string) => {
  if (process.env.NODE_ENV === 'test') {
    return process.env[`${env}_TEST`] || process.env[env];
  }
  return process.env[env];
};
