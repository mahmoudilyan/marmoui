import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const componentName = searchParams.get('component');

	if (!componentName) {
		return NextResponse.json({ error: 'Component name is required' }, { status: 400 });
	}

	try {
		const propsFilePath = path.join(process.cwd(), 'src/data/component-props.json');

		// Check if props file exists
		if (!fs.existsSync(propsFilePath)) {
			return NextResponse.json(
				{
					error: 'Props documentation not generated. Run: pnpm generate:props',
					props: [],
				},
				{ status: 200 }
			);
		}

		const propsData = JSON.parse(fs.readFileSync(propsFilePath, 'utf-8'));
		const componentProps = propsData[componentName];

		if (!componentProps) {
			return NextResponse.json(
				{
					error: `No props found for component: ${componentName}`,
					props: [],
				},
				{ status: 200 }
			);
		}

		return NextResponse.json(componentProps);
	} catch (error) {
		console.error('Error loading component props:', error);
		return NextResponse.json(
			{ error: 'Failed to load component props', props: [] },
			{ status: 500 }
		);
	}
}

