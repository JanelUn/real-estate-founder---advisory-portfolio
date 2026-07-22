import { DEFAULT_CONTEXT } from '../../shared/services';

function queryParam(name: string): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get(name);
}

export function isEmbedded(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch {
    // Acceso bloqueado entre orígenes distintos: solo pasa si estamos en un iframe cross-site.
    return true;
  }
}

export function isEmbedMode(): boolean {
  return isEmbedded() || queryParam('embed') === '1';
}

export function getContext(): string {
  return queryParam('context') ?? DEFAULT_CONTEXT;
}

export function notifyParent(type: string, payload?: Record<string, unknown>): void {
  if (!isEmbedded()) return;
  window.parent.postMessage({ source: 'yanel-agenda', type, ...payload }, '*');
}
