const STORAGE = window.sessionStorage;

const setItem = (key, value) => {
    STORAGE.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
    const val = STORAGE.getItem(key);
    if (!val || val === 'undefined') return "";
    try {
        return JSON.parse(val);
    } catch (e) {
        return val;
    }
};

const removeItem = (key) => {
    STORAGE.removeItem(key);
};

export default Storage = {
    get(key) {
        return getItem(key);
    },
    set(key, value) {
        setItem(key, value);
    },
    remove(key) {
        removeItem(key);
    }
};

