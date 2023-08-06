import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  sourcemap: true,
  treeshake: true,
  dts: true,
  ...options,
}));
