module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["src/step-definitions/**/*.ts", "src/support/**/*.ts"],
    format: [
      "progress-bar",
      "html:cucumber-report.html",
      "json:cucumber-report.json",
    ],
  },
};
