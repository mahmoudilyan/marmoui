'use client';

import React from 'react';

export * from './components/accordion';
export * from './components/alert';
export * from './components/avatar';
export * from './components/badge';
export * from './components/breadcrumbs';
export * from './components/button';
export * from './components/button-group';
export * from './components/button-variants';
export * from './components/icon-button';
export * from './components/card';
export * from './components/checkbox';
export * from './components/checkbox-card';
export * from './components/dialog';
export * from './components/dropdown-menu';
export * from './components/field';
export * from './components/form';
export * from './components/input';
export * from './components/textarea';
export * from './components/input-group';
export * from './components/input-shortcode';
export * from './components/menu';
export * from './components/popover';
export * from './components/progress';
export * from './components/provider';
export * from './components/select';
export * from './components/slider';
export * from './components/spinner';
export * from './components/switch';
export * from './components/tabs';
export * from './components/tooltip';
export * from './components/icon';
export * from './components/skeleton';

// Layout components
export * from './components/kpi-card';
export * from './components/layout';
export * from './components/box';
export * from './components/flex';
export * from './components/stepper';

// Icons
export * from './components/icons';

// Utility components
export * from './components/action-bar';
export * from './components/close-button';
export * from './components/description-list';
export * from './components/dialog-manager';
export * from './components/dialog-stack';
export * from './components/drawer';
export * from './components/sheet';

// Dialog system
export * from './hooks/use-dialog';
export * from './hooks/use-mobile';
export * from './components/empty-state';
export * from './components/hover-card';
export * from './components/link-button';
export * from './components/media-picker-example';
export * from './components/radio';
export * from './components/radio-card';
export * from './components/rating';
export * from './components/segmented-control';
export * from './components/selection-manager';
export * from './components/sidebar';
export * from './components/stat-card';
export * from './components/tag';
export * from './components/text';
export * from './components/toggle-group';
export * from './components/toaster';
export * from './components/types';

// New components
export * from './components/avatar-checkbox';
export * from './components/card';
export * from './components/number-input';
export * from './components/steps';
export * from './components/select-checkbox-searchable';
export * from './components/select-searchable';
export * from './components/select-multi-category';
export * from './components/label';
//export * from './components/rich-text-input';
export * from './components/date-picker';
export * from './components/calendar';
export * from './components/month-picker';
export * from './components/scroll-area';
export * from './components/splitter';
export * from './components/pagination';
export * from './components/widget';
export * from './components/drag-drop/sortable-grid';
export * from './components/lead-lifecycle-funnel';
export * from './components/data-table';
export * from './components/data-table/table';
export * from './components/chart';
export * from './components/tags-input';
// Data table utilities
export {
	convertColumnsToFormData,
	convertOrderToFormData,
	createServerParams,
	type DataTableParams,
} from './lib/data-table';

// Specific path exports
export { default as CenterContainer } from './components/layout/center-container';
export { default as TopBar } from './components/layout/topbar';
export { DataNav } from './components/layout/data-nav';
export { default as DialogManager } from './components/dialog-manager';
export { default as MessageComposer } from './components/common-dialogs/compose/message-composer';
export { MediaPickerExample } from './components/media-picker-example';
export { Toaster } from './components/toaster';

export * from './lib/utils';
export * from './lib/data-table';
export * from './theme';

export { default as AnotherExamples } from './examples';
// Styles
export function Examples() {
	React.createElement(
		'div',
		{ className: 'bg-background' },
		React.createElement('h1', { className: 'heading-lg' }, 'Examples'),
		React.createElement('p', { className: 'body-md' }, 'This is a paragraph'),
		React.createElement('p', { className: 'body-sm' }, 'This is a paragraph'),
		React.createElement('p', { className: 'body-xs' }, 'This is a paragraph'),
		React.createElement('p', { className: 'caps-lg' }, 'This is a paragraph'),
		React.createElement('p', { className: 'caps-md' }, 'This is a paragraph'),
		React.createElement('p', { className: 'caps-sm' }, 'This is a paragraph'),
		React.createElement('span', { className: 'caps-sm' }, 'This is a span'),
		React.createElement('strong', { className: 'text-bold' }, 'This is a strong'),
		React.createElement('em', { className: 'text-italic' }, 'This is a em'),
		React.createElement('small', { className: 'text-small' }, 'This is a small'),
		React.createElement('code', { className: 'text-code' }, 'This is a code'),
		React.createElement('pre', { className: 'text-pre' }, 'This is a pre'),
		React.createElement('blockquote', { className: 'text-blockquote' }, 'This is a blockquote'),
		React.createElement('hr', { className: 'text-hr pt-1.5' }, 'This is a hr'),
		React.createElement('button', { className: 'bg-primary text-primary-foreground' }, 'Click me'),
		React.createElement('input', { className: 'bg-input text-input-foreground' }, 'Input')
	);
}
