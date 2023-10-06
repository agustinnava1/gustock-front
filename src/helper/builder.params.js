export function builderParams(request) {
  const params = Object.keys(request)
    .filter(key => request[key] !== null)
    .map(key => `${key}=${request[key]}`)
    .join('&');
    
  return params;
}