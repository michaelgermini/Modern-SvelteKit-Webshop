import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['./src/lib/test/setup.ts'],
		coverage: {
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.{js,ts,svelte}'],
			exclude: ['src/**/*.{test,spec}.{js,ts}', 'src/lib/test/**']
		},
		reporters: ['verbose', 'json'],
		outputFile: './test-results.json'
	}
});
