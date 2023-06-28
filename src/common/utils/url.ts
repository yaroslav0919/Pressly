/**
 * Helper function to build API Url
 * @param baseURL string
 * @param route string
 */
export const buildAPIUrl = (baseURL: string, route?: string) => {
  return `${baseURL}${route}`;
};
