import { IconProps } from '../types';

export default function StepIcon(props: IconProps) {
	const {
		fill = 'currentColor',
		strokeColor,
		width = '24',
		height = '24',
		className = '',
		...rest
	} = props;

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill={fill}
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			{...rest}
		>
			<g clip-Path="url(#clip0_9482_23621)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.58999 7.59 3.99999 12 3.99999C16.41 3.99999 20 7.58999 20 12C20 16.41 16.41 20 12 20ZM15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 8.99999 12 8.99999C13.66 8.99999 15 10.34 15 12Z"
					fill={fill}
				/>
			</g>
			<defs>
				<clipPath id="clip0_9482_23621">
					<rect width="24" height="24" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
}
