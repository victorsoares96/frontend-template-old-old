const path = require('path');

module.exports = {
  'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}': (absolutePaths) => {
    const relativePaths = absolutePaths.map((p) => path.relative(process.cwd(), p));
    return [
      `prettier --write ${relativePaths.join(' ')}`,
      `git add ${relativePaths.join(' ')}`,
    ];
  },
  'src/**/*.{js,jsx,ts,tsx}': (absolutePaths) => {
    const relativePaths = absolutePaths.map((p) => path.relative(process.cwd(), p));
    return [
      `eslint --fix ${relativePaths.join(' ')}`,
      `git add ${relativePaths.join(' ')}`,
    ];
  },
  '**/*.{ts,tsx}': () => {
		return ['tsc -p tsconfig.json --noEmit --pretty --skipLibCheck']
	}
}