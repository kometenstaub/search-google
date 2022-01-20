// Thank you: https://github.com/aidenlx/media-extended/blob/main/esbuild.js
import esbuild from 'esbuild';
import fs from 'fs';
import process from 'process';
import builtins from 'builtin-modules';

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
If you want to view the source, visit the plugin’s github repository.
*/
`;

const copyManifest = {
	name: 'copy-manifest',
	setup: (build) => {
		build.onEnd(() => {
			fs.copyFileSync('manifest.json', 'build/manifest.json');
			// fs.copyFileSync('src/styles.css', 'build/styles.css')
		});
	},
};

const isProd = process.env.BUILD === 'production';

(async () => {
	try {
		await esbuild.build({
			entryPoints: ['src/main.ts'],
			bundle: true,
			watch: !isProd,
			//platform: 'browser',
			external: ['obsidian', 'electron', ...builtins],
			format: 'cjs',
			target: 'es2016',
			banner: { js: banner },
			sourcemap: isProd ? false : 'inline',
			minify: isProd,
			logLevel: 'info',
			treeShaking: true,
			define: {
				'process.env.NODE_ENV': JSON.stringify(process.env.BUILD),
			},
			outfile: 'build/main.js',
			plugins: [copyManifest],
		});
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
})();