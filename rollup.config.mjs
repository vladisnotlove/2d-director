import typescript from "@rollup/plugin-typescript";

export default [
	{
		input: "src/index.ts",
		output: {
			dir: "dist",
			format: "esm",
			name: "2d-director",
		},
		plugins: [typescript()],
	},
	{
		input: "src/preview.ts",
		output: {
			dir: "preview/js",
			format: "esm",
		},
		plugins: [
			typescript({
				compilerOptions: {
					declaration: false,
					declarationDir: undefined,
				},
			}),
		],
	},
];
