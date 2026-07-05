'use client';

import React from 'react';
import { Button, ToastBar, toaster } from '@marmoui/ui';

export function ToastVariantsPreview() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex max-w-md flex-col gap-5">
				<ToastBar
					title="Info Toasts"
					variant="info"
					action={{ label: 'Undo', onClick: () => {} }}
				/>
				<ToastBar
					title="Success Toasts"
					variant="success"
					action={{ label: 'Undo', onClick: () => {} }}
				/>
			</div>
			<div className="flex flex-wrap gap-2">
				<Button
					variant="secondary"
					size="sm"
					onClick={() => toaster.success('Saved successfully')}
				>
					Success Toast
				</Button>
				<Button
					variant="secondary"
					size="sm"
					onClick={() => toaster.error('Something went wrong')}
				>
					Error Toast
				</Button>
				<Button
					variant="secondary"
					size="sm"
					onClick={() =>
						toaster.info('3 new contacts imported', {
							action: { label: 'Undo', onClick: () => toaster.dismiss() },
						})
					}
				>
					Info + Undo
				</Button>
				<Button
					variant="secondary"
					size="sm"
					onClick={() => toaster.warning('Storage almost full')}
				>
					Warning Toast
				</Button>
			</div>
		</div>
	);
}
