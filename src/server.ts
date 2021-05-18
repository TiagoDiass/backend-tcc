import './littleMagicCode';
import app from './app';
import packageJson from '../package.json';

const PORT = 3333;

app.listen(PORT, () => {
  console.log(
    `[SERVER] > Server running on port ${PORT}. Version: ${packageJson.version}`
  );
});
