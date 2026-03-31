/**
 * VIP Modal Cookie Management
 * Tracks whether the VIP signup modal has been shown to the user
 */

const VIP_MODAL_COOKIE = 'vip_modal_shown';
const COOKIE_EXPIRY_DAYS = 30;

/**
 * Check if VIP modal has already been shown to this user
 */
export function hasVIPModalBeenShown(): boolean {
  if (typeof document === 'undefined') return false;
  
  const cookies = document.cookie.split(';');
  return cookies.some(cookie => 
    cookie.trim().startsWith(`${VIP_MODAL_COOKIE}=`)
  );
}

/**
 * Mark VIP modal as shown by setting a cookie
 */
export function markVIPModalAsShown(): void {
  if (typeof document === 'undefined') return;
  
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
  
  document.cookie = `${VIP_MODAL_COOKIE}=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
}

/**
 * Clear VIP modal cookie (for testing or when user clears cookies)
 */
export function clearVIPModalCookie(): void {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${VIP_MODAL_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
