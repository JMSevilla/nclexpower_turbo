export const config = {
  get value() {
    return {
      Development: "http://localhost:5281/v1/api",
      Content: "http://localhost:5281/api",
      Tokenize: "34a89f9063bb49a59d2525220b677e25",
      MockDB: "http://localhost:3001",
      XApiKey: "34a89f9063bb49a59d2525220b677e25",
      HerokuDev: "https://nclexdev-6ecb32719de0.herokuapp.com/api", // this env is for dev side only.
    };
  },
};
