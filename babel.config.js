module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  overrides: [
    {
      test: /node_modules\/react-dnd/,
      presets: [["@babel/preset-env", { targets: { node: "current" } }]],
    },
  ],
};
