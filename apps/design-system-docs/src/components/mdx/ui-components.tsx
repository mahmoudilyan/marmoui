'use client';

// Re-export UI components for MDX
// These are optimized via optimizePackageImports in next.config.ts
// which automatically tree-shakes unused components

export { Button } from '@marmoui/ui';

// Re-export commonly used icons (icons are lightweight)
export {
	MdAdd,
	MdEdit,
	MdDelete,
	MdSave,
	MdShare,
	MdFavorite,
	MdMoreVert,
	MdClose,
	MdSettings,
	MdSearch,
	MdMenu,
	MdArrowBack,
	MdRefresh,
	MdDownload,
	MdCheck,
	MdWarning,
	MdInfo,
	MdStar,
	MdFormatBold,
	MdFormatItalic,
	MdFormatUnderlined,
	MdFormatAlignLeft,
	MdFormatAlignCenter,
	MdFormatAlignRight,
	MdViewList,
	MdViewModule,
	MdViewStream,
	MdArrowForward,
} from 'react-icons/md';

// Re-export components - Next.js will optimize these via optimizePackageImports
export { Input } from '@marmoui/ui';
export { Select } from '@marmoui/ui';
export { Badge } from '@marmoui/ui';
export {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@marmoui/ui';
export { Avatar, AvatarImage, AvatarFallback } from '@marmoui/ui';
export { Text } from '@marmoui/ui';
export { Box } from '@marmoui/ui';
export { Flex } from '@marmoui/ui';
export {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@marmoui/ui';
export { Tabs } from '@marmoui/ui';
export { Checkbox } from '@marmoui/ui';
export { Switch } from '@marmoui/ui';
export { Slider } from '@marmoui/ui';
export { Progress } from '@marmoui/ui';
export { Spinner } from '@marmoui/ui';
export { Tooltip } from '@marmoui/ui';
export { Popover } from '@marmoui/ui';
export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuShortcut,
} from '@marmoui/ui';
export { Label } from '@marmoui/ui';
export { Textarea } from '@marmoui/ui';
export { RadioGroup, Radio } from '@marmoui/ui';
export { Alert } from '@marmoui/ui';
export { Skeleton } from '@marmoui/ui';
export { Accordion } from '@marmoui/ui';
export { Breadcrumb } from '@marmoui/ui';
export { ButtonGroup } from '@marmoui/ui';
export { IconButton } from '@marmoui/ui';
export { DatePicker } from '@marmoui/ui';
export { Calendar } from '@marmoui/ui';
export { DataTable } from '@marmoui/ui';
export { PageSection } from '@marmoui/ui';
export { TagsInput } from '@marmoui/ui';
export { NumberInput } from '@marmoui/ui';
export { Stepper } from '@marmoui/ui';
export { EmptyState } from '@marmoui/ui';
export { HoverCard } from '@marmoui/ui';
export { LinkButton } from '@marmoui/ui';
export { RadioCard } from '@marmoui/ui';
export { Rating } from '@marmoui/ui';
export { SegmentedControl } from '@marmoui/ui';
export { StatCard } from '@marmoui/ui';
export { Tag } from '@marmoui/ui';
export { ToggleGroup } from '@marmoui/ui';
export { ScrollArea } from '@marmoui/ui';
export { Splitter } from '@marmoui/ui';
export { Drawer } from '@marmoui/ui';
export { CloseButton } from '@marmoui/ui';
export { DescriptionList } from '@marmoui/ui';
export { Field } from '@marmoui/ui';
export { RoadmapVotingProvider, VoteButton } from './roadmap-voting';
export { Figure, FigureGrid } from './figure';
