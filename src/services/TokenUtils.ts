
export function isTokenExpired(token) {
  // Split the token into its three parts (header, payload, and signature)
  const [header, payload, signature] = token.split('.');

  // Decode the header
  const decodedHeader = JSON.parse(atob(header));

  // Get the expiration time (in seconds) from the header
  const expirationTime = decodedHeader.exp;

  // Get the current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if the token has expired
  return currentTime > expirationTime;
}
