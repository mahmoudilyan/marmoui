import * as React from 'react';
import {
	SiTypescript,
	SiJavascript,
	SiReact,
	SiHtml5,
	SiCss3,
	SiJson,
	SiMarkdown,
} from 'react-icons/si';
import { MdCode, MdTerminal } from 'react-icons/md';

export function getIconForLanguageExtension(language: string) {
	const iconMap: Record<string, React.ReactNode> = {
		tsx: <SiTypescript className="text-[#3178c6]" />,
		ts: <SiTypescript className="text-[#3178c6]" />,
		typescript: <SiTypescript className="text-[#3178c6]" />,
		jsx: <SiReact className="text-[#61dafb]" />,
		js: <SiJavascript className="text-[#f7df1e]" />,
		javascript: <SiJavascript className="text-[#f7df1e]" />,
		html: <SiHtml5 className="text-[#e34c26]" />,
		css: <SiCss3 className="text-[#1572b6]" />,
		json: <SiJson className="text-[#5a5a5a]" />,
		md: <SiMarkdown />,
		markdown: <SiMarkdown />,
		bash: <MdTerminal />,
		sh: <MdTerminal />,
		shell: <MdTerminal />,
		default: <MdCode />,
	};

	return iconMap[language.toLowerCase()] || iconMap.default;
}















