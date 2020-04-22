import cookie from 'js-cookie';

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: '/'
    });
  }
};

export const removeCookie = (key, value) => {
  if (process.browser) {
    cookie.remove(key,value, {
      expires:1,
      path: '/'
    });
  }
};

export const getCookie = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};