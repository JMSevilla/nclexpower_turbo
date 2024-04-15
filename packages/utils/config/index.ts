export const config = {
  get value() {
    return {
      Development: "http://localhost:5111/api/v1/gateway",
      Tokenize: "34a89f9063bb49a59d2525220b677e25",
      MockDB: "http://localhost:3001",
      XApiKey: "34a89f9063bb49a59d2525220b677e25",
      Devenv: "https://nclexdev-6ecb32719de0.herokuapp.com/api" // this env is for dev side only.
    };
  },
};
