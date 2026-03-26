export default {
  "apps/api/**/*.{ts,tsx,js,mjs}": [
    "eslint -c apps/api/eslint.config.mjs --fix --max-warnings 0",
    "prettier --write",
  ],
  "apps/store/**/*.{ts,tsx,js,mjs}": [
    "eslint -c apps/store/eslint.config.mjs --fix --max-warnings 0",
    "prettier --write",
  ],
  "apps/docs/**/*.{ts,tsx,js,mjs}": [
    "eslint -c apps/docs/eslint.config.js --fix --max-warnings 0",
    "prettier --write",
  ],
  "packages/ui/**/*.{ts,tsx,js,mjs}": [
    "eslint --fix --max-warnings 0",
    "prettier --write",
  ],
  "*.{md,json,yml,yaml}": "prettier --write",
};
