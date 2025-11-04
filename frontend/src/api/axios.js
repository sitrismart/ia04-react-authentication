import axios from 'axios';

// We'll set baseURL to your backend
const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
});

// The accessToken will be provided by AuthProvider via a setter we export.
// To avoid circular import, we implement a small token store below.
let accessTokenMemory = null;
export function setAccessToken(token) { accessTokenMemory = token; }
export function clearAccessToken() { accessTokenMemory = null; }
export function getAccessToken() { return accessTokenMemory; }

// Refresh control to avoid parallel refresh calls
let isRefreshing = false;
let failedQueue = [];
// Optional handler to call when refresh fails (e.g. to trigger logout)
let onRefreshFail = null;

export function setOnRefreshFail(fn) { onRefreshFail = fn; }

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  if (!originalRequest) return Promise.reject(error);

  // If 401 and not a refresh request, attempt refresh
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      // no refresh token -> notify app-level handler
      if (onRefreshFail) onRefreshFail();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // queue the request
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        return api(originalRequest);
      }).catch(err => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      const resp = await axios.post(`${api.defaults.baseURL}/auth/refresh`, { refreshToken });
      const { accessToken, refreshToken: newRefresh } = resp.data;
      // update memory and localStorage
      setAccessToken(accessToken);
      localStorage.setItem('refreshToken', newRefresh);
      processQueue(null, accessToken);
      isRefreshing = false;

      originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      isRefreshing = false;
      // refresh failed -> notify app-level handler so it can logout/redirect
      if (onRefreshFail) {
        try { onRefreshFail(); } catch { /* ignore errors from handler */ }
      }
      return Promise.reject(err);
    }
  }

  return Promise.reject(error);
});

export default api;
