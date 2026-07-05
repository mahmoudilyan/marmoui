'use client';

import React from 'react';

interface PropInfo {
	name: string;
	type: string;
	required: boolean;
	description?: string;
	defaultValue?: string;
}

interface PropsTableProps {
	componentName: string;
}

export function PropsTable({ componentName }: PropsTableProps) {
	const [props, setProps] = React.useState<PropInfo[] | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		async function loadProps() {
			try {
				const response = await fetch('/api/component-props?component=' + componentName);
				if (!response.ok) {
					throw new Error('Failed to load props');
				}
				const data = await response.json();
				setProps(data.props || []);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		}

		loadProps();
	}, [componentName]);

	if (loading) {
		return (
			<div className="my-8">
				<h2 className="text-2xl font-semibold mb-4">Props</h2>
				<div className="animate-pulse">
					<div className="h-10 bg-muted rounded mb-2"></div>
					<div className="h-20 bg-muted rounded mb-2"></div>
					<div className="h-20 bg-muted rounded"></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="my-8 p-4 border border-destructive bg-destructive/10 rounded-lg">
				<h2 className="text-2xl font-semibold mb-2">Props</h2>
				<p className="text-sm text-muted-foreground">Unable to load props documentation: {error}</p>
			</div>
		);
	}

	if (!props || props.length === 0) {
		return null;
	}

	return (
		<div className="my-8">
			<h2 className="text-2xl font-semibold mb-4">Props</h2>
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="border-b">
							<th className="text-left py-3 px-4 font-semibold bg-bg">Prop</th>
							<th className="text-left py-3 px-4 font-semibold bg-bg">Type</th>
							<th className="text-left py-3 px-4 font-semibold bg-bg">Default</th>
							<th className="text-left py-3 px-4 font-semibold bg-bg">Description</th>
						</tr>
					</thead>
					<tbody>
						{props.map(prop => (
							<tr key={prop.name} className="border-b hover:bg-bg transition-colors">
								<td className="py-3 px-4">
									<code className="text-sm font-mono bg-secondary px-2 py-1 rounded">
										{prop.name}
										{prop.required && <span className="text-destructive ml-1">*</span>}
									</code>
								</td>
								<td className="py-3 px-4">
									<code className="text-xs font-mono text-ink break-all">{prop.type}</code>
								</td>
								<td className="py-3 px-4">
									{prop.defaultValue ? (
										<code className="text-xs font-mono bg-secondary px-2 py-1 rounded">
											{prop.defaultValue}
										</code>
									) : (
										<span className="text-muted-foreground text-sm">-</span>
									)}
								</td>
								<td className="py-3 px-4 text-sm text-muted-foreground">{prop.description || '-'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<p className="text-xs text-muted-foreground mt-4">
				<span className="text-destructive">*</span> Required prop
			</p>
		</div>
	);
}
