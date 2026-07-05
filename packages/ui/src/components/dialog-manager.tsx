'use client';

import { ComponentType } from 'react';
import { Dialog } from './dialog';
import { DialogContent } from './dialog';
import { useDialogState } from '../hooks/use-dialog';

export interface DialogManagerConfig {
	/**
	 * Map of dialog types to their components
	 * @example
	 * {
	 *   deleteCampaign: DeleteCampaignDialog,
	 *   createFolder: CreateFolderDialog
	 * }
	 */
	dialogs: Record<string, ComponentType<any>>;

	/**
	 * Optional default config for all dialogs
	 */
	defaultConfig?: {
		size?: 'md' | 'lg' | 'xl' | 'full';
		closeOnEscape?: boolean;
		closeOnInteractOutside?: boolean;
	};
}

export interface DialogManagerProps {
	/**
	 * Dialog configuration including dialog registry and default settings
	 */
	config: DialogManagerConfig;
}

/**
 * DialogManager renders the active dialog from the dialog stack.
 *
 * This is a base component from @marmoui/ui that works with any app.
 * Apps provide their own dialog registry and config via a single `config` prop.
 *
 * @example
 * ```tsx
 * import { DialogManager } from '@marmoui/ui';
 * import { appDialogConfig } from './dialogs';
 *
 * <DialogManager config={appDialogConfig} />
 * ```
 */
export function DialogManager({ config }: DialogManagerProps) {
	const { dialogs, defaultConfig } = config;
	const { dialogType, dialogProps, dialogConfig, closeDialog } = useDialogState();

	if (!dialogType) return null;

	const SpecificDialog = dialogs[dialogType];

	if (!SpecificDialog) {
		console.warn(`[DialogManager] Dialog type "${dialogType}" not found in dialogs registry`);
		return null;
	}

	// Extract standard dialog props (available to all dialogs automatically)
	const { dialogTitle, dialogDescription, ...remainingProps } = dialogProps;

	// Merge default config with dialog-specific config
	const mergedConfig = { ...defaultConfig, ...dialogConfig };

	// Extract size from config if provided, otherwise use default
	// Map config sizes to DialogContent supported sizes
	const configSize = mergedConfig?.size;
	const size: 'md' | 'lg' | 'xl' | 'full' =
		configSize === 'xs' || configSize === 'sm'
			? 'md'
			: (configSize as 'md' | 'lg' | 'xl' | 'full') || 'md';

	// Special handling for dialogs that need custom close behavior
	const needsCustomClose = mergedConfig?.closeOnInteractOutside === false;

	return (
		<Dialog
			open={!!dialogType}
			onOpenChange={open => {
				if (!open && !needsCustomClose) {
					closeDialog();
				}
			}}
		>
			<DialogContent size={size} showCloseButton={mergedConfig?.closeOnEscape !== false}>
				{/* All dialogs automatically receive dialogTitle and dialogDescription */}
				<SpecificDialog
					onClose={closeDialog}
					dialogTitle={dialogTitle}
					dialogDescription={dialogDescription}
					{...remainingProps}
				/>
			</DialogContent>
		</Dialog>
	);
}

export default DialogManager;
