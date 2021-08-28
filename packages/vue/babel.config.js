module.exports = {
  presets: ["@vue/app"],
  plugins: [
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
  ],
};
