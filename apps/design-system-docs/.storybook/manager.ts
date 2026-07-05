import { addons } from 'storybook/manager-api';
import { marmoTheme } from './marmo-theme';

addons.setConfig({
	theme: marmoTheme,
	panelPosition: 'bottom',
	selectedPanel: 'storybook/docs/panel',
});
