export const config = {
  get value() {
    return {
      NODE_ENV: process.env.NODE_ENV,
      API_URL: "https://nclexdev-6ecb32719de0.herokuapp.com",
      LOCAL_API_URL: "http://localhost:5281",
      XAPIKEY: "34a89f9063bb49a59d2525220b677e25",
    };
  },
};
