import { CalendarBlank } from '@phosphor-icons/react';
import { Icon } from './components/icon';
import { Text } from './components/text';

export default function Examples() {
	return (
		<div className="bg-background pt-1.5">
			<Icon icon={<CalendarBlank />} className="w-2 h-2 fill-icon" />
			<h1>Examples</h1>
			<Text variant="heading-3xl">Heading 2xl</Text>
			<Text variant="heading-2xl">Heading xl</Text>
			<Text variant="heading-xl">Heading lg</Text>
			<Text variant="heading-lg">Heading lg</Text>
			<Text variant="heading-md">Heading md</Text>
			<Text variant="heading-sm">Heading sm</Text>
			<Text variant="heading-xs">Heading xs</Text>
			<Text variant="body-lg">Body lg</Text>
			<Text variant="body-md">Body md</Text>
			<Text variant="body-sm">Body sm</Text>
			<Text variant="body-xs">Body xs</Text>
			<Text variant="caps-lg">Caps lg</Text>
			<Text variant="caps-md">Caps md</Text>
			<Text variant="caps-sm">Caps sm</Text>
			<div className="flex items-center gap-2 text-sm">text</div>
		</div>
	);
}
