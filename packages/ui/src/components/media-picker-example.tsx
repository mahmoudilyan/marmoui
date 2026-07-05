'use client';

import { useState } from 'react';
import { Button } from './button';

export function MediaPickerExample() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');

	const handleSelect = (url: string) => {
		setSelectedImage(url);
		console.log('Selected media:', url);
	};

	return (
		<div className="p-8">
			<Button onClick={() => setIsOpen(true)}>
				Open Media Picker
			</Button>

			{selectedImage && (
				<div className="mt-4">
					<p className="font-bold mb-2">
						Selected Image:
					</p>
					<img
						src={selectedImage}
						alt="Selected"
						className="max-w-96 rounded-md border border-gray-200"
					/>
					<p className="text-sm text-gray-600 mt-2 break-all">
						{selectedImage}
					</p>
				</div>
			)}

			{/* Note: MediaPickerDialog component would need to be implemented */}
		</div>
	);
}