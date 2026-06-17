// Root ESLint flat config for the Искра.DCI monorepo.
// Composes @iskra-ui/eslint-config with Storybook lint rules for *.stories files.
// https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import iskraConfig from '@iskra-ui/eslint-config';
import storybook from 'eslint-plugin-storybook';

export default [...iskraConfig, ...storybook.configs['flat/recommended']];
