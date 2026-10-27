const csrfToken = () => document.querySelector('meta[name="csrf-token"]')?.content || '';

export async function api(path, options = {}) {
    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');
    headers.set('X-Requested-With', 'XMLHttpRequest');
    if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');
    if (!['GET', 'HEAD', 'OPTIONS'].includes((options.method || 'GET').toUpperCase())) headers.set('X-CSRF-TOKEN', csrfToken());

    const response = await fetch(path, { credentials: 'same-origin', ...options, headers });
    const data = response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok) {
        const error = new Error(data?.message || (response.status === 401 ? 'Silakan login untuk melanjutkan.' : 'Permintaan gagal. Periksa data dan coba lagi.'));
        error.status = response.status;
        error.errors = data?.errors || {};
        throw error;
    }
    return data;
}

export function apiErrorMessage(error) {
    return Object.values(error?.errors || {}).flat().join(' ') || error?.message || 'Terjadi kesalahan.';
}