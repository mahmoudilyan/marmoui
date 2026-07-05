'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Dialog configuration types
export interface DialogConfig {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
	closeOnEscape?: boolean;
	closeOnInteractOutside?: boolean;
	trapFocus?: boolean;
	preventScroll?: boolean;
	role?: 'dialog' | 'alertdialog';
	'aria-label'?: string;
}

export interface DialogEntry {
	dialogType: string;
	dialogProps: Record<string, any>;
	config?: DialogConfig;
}

export interface DialogContextType {
	dialogStack: DialogEntry[];
	openDialog: (
		dialogType: string,
		dialogProps?: Record<string, any>,
		config?: DialogConfig
	) => void;
	closeDialog: () => void;
	closeAllDialogs: () => void;
}

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProviderProps {
	children: ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
	const [dialogStack, setDialogStack] = useState<DialogEntry[]>([]);

	const openDialog = (
		dialogType: string,
		dialogProps: Record<string, any> = {},
		config?: DialogConfig
	) => {
		setDialogStack(prev => [...prev, { dialogType, dialogProps, config }]);
	};

	const closeDialog = () => {
		setDialogStack(prev => prev.slice(0, -1));
	};

	const closeAllDialogs = () => {
		setDialogStack([]);
	};

	return (
		<DialogContext.Provider
			value={{
				dialogStack,
				openDialog,
				closeDialog,
				closeAllDialogs,
			}}
		>
			{children}
		</DialogContext.Provider>
	);
}

export function useDialog(): DialogContextType {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error('useDialog must be used within a DialogProvider');
	}
	return context;
}

interface UseDialogStateReturn {
	dialogType: string | null;
	dialogProps: Record<string, any>;
	dialogConfig: DialogConfig | undefined;
	closeDialog: () => void;
	openDialog: (
		dialogType: string,
		dialogProps?: Record<string, any>,
		config?: DialogConfig
	) => void;
	closeAllDialogs: () => void;
}

/**
 * Hook to get the current dialog state (for use in DialogManager)
 */
export function useDialogState(): UseDialogStateReturn {
	const context = useContext(DialogContext);

	if (!context) {
		throw new Error('useDialogState must be used within a DialogProvider');
	}

	const currentDialog = context.dialogStack[context.dialogStack.length - 1];

	return {
		openDialog: context.openDialog,
		dialogType: currentDialog?.dialogType ?? null,
		dialogProps: currentDialog?.dialogProps ?? {},
		dialogConfig: currentDialog?.config,
		closeDialog: context.closeDialog,
		closeAllDialogs: context.closeAllDialogs,
	};
}
