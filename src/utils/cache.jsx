export const getCache = (key) => {
    const cache = localStorage.getItem(key);
    return cache ? JSON.parse(cache).data : null;
};

export const isCacheStale = (key, maxAge = 3600000) => {
    const cache = getCache(key);
    if (!cache) return true;
    return Date.now() - cache.timestamp > maxAge;
};

export const setCache = (key, data) => {
    const cache = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(cache));
};

export const fetchWithCache = async (url, maxAge = 3600000) => {
    const cacheKey = `${url}`;
    if (!isCacheStale(cacheKey, maxAge)) {
        return getCache(cacheKey).data; // Retorna do cache
    }

    const response = await fetch(url);
    const data = await response.json();

    setCache(cacheKey, data); // Salva no cache
    return data;
};
