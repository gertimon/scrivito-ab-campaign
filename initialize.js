export function initialize(opts) {
  function importAll(r) {
    r.keys().forEach(r);
  }

  importAll(require.context("./src", true, /\.(js|jsx)$/));
};
