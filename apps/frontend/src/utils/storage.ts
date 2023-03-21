const prefix = 'br';

type TokenType = 'access' | 'refresh';

const getKey = (type: TokenType) => `${prefix}-${type}_token`;

const storage = {
  getToken: (type: TokenType = 'access') => {
    const token = window.localStorage.getItem(getKey(type));
    return token ? JSON.parse(token) : null;
  },
  setToken: (token: string, type: TokenType = 'access') => {
    window.localStorage.setItem(getKey(type), JSON.stringify(token));
  },
  clearToken: (type: TokenType = 'access') => {
    window.localStorage.removeItem(getKey(type));
  }
};

export default storage;