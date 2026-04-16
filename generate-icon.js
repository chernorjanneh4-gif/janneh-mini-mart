import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const iconSvgPath = path.join(process.cwd(), 'build', 'icon.svg');
const iconPngPath = path.join(process.cwd(), 'build', 'icon.png');

if (!fs.existsSync(iconSvgPath)) {
  console.error('Missing build/icon.svg. Add your custom icon source to build/icon.svg.');
  process.exit(1);
}

const shouldGenerate = !fs.existsSync(iconPngPath) || fs.statSync(iconSvgPath).mtimeMs > fs.statSync(iconPngPath).mtimeMs;
if (!shouldGenerate) {
  console.log('Using existing build/icon.png');
  process.exit(0);
}

try {
  console.log('Generating build/icon.png from build/icon.svg...');
  execSync(`npx -y sharp-cli@latest -i "${iconSvgPath}" -o "${iconPngPath}"`, { stdio: 'inherit' });
  console.log('Icon created successfully.');
} catch (error) {
  console.error('Failed to generate icon.png from icon.svg:', error);
  process.exit(1);
}

