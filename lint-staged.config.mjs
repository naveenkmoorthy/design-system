export default {
  "apps/**/*.{ts,tsx,js,mjs}": [
    "eslint --fix --max-warnings 0",
    "prettier --write",
  ],
  "packages/ui/**/*.{ts,tsx,js,mjs}": [
    "eslint --fix --max-warnings 0",
    "prettier --write",
  ],
  "*.{md,json,yml,yaml}": "prettier --write",
};
