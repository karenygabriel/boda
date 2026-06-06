/**
 * Reads the `?invitacion=` query param from the URL.
 * Returns `'familiar'` for VIP family guests, `'general'` for everyone else.
 *
 * Shareable links:
 *   Family → https://…/?invitacion=familiar
 *   General → https://…/  (no param needed)
 */
export type InviteType = 'familiar' | 'general';

export function getInviteType(): InviteType {
    const params = new URLSearchParams(window.location.search);
    return params.get('invitacion') === 'familiar' ? 'familiar' : 'general';
}
