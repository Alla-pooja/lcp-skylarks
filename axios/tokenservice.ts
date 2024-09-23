const getLocalRefreshToken = () => {
  const tokenObj = JSON.parse(localStorage.getItem("token") || "{}");
  return tokenObj?.refresh;
};

const getLocalAccessToken = () => {
  const tokenObj = JSON.parse(localStorage.getItem("token") || "{}");
  return tokenObj?.access;
};

const updateLocalAccessToken = (token: string) => {
  let tokenObj = JSON.parse(localStorage.getItem("token") || "{}");
  tokenObj.access = token;
  localStorage.setItem("token", JSON.stringify(tokenObj));
};

const getToken = () => {
  return JSON.parse(localStorage.getItem("token") || "{}");
};

const setToken = (tokenObj: Record<string, string>) => {
  localStorage.setItem("token", JSON.stringify(tokenObj));
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser") || "{}");
};

const setCurrentUser = (userObj: Record<string, any>) => {
  localStorage.setItem("currentUser", JSON.stringify(userObj));
};

const removeCurrentUser = () => {
  localStorage.removeItem("currentUser");
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getToken,
  setToken,
  getCurrentUser,
  setCurrentUser,
  removeCurrentUser,
  removeToken,
};

export default TokenService;
