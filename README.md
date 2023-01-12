Minification:
```
npx terser -c -m -o filename.min.js -- filename.js
```

Run JSX Prepocessor:
```
npx babel --watch src --out-dir ./dev --presets react-app/prod
```