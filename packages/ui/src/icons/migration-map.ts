/**
 * Icon policy for `@marmoui/ui` (internal)
 *
 * `packages/ui` uses ONLY Phosphor icons from `@phosphor-icons/react`.
 * Material (`react-icons/md`), Lucide, Heroicons, etc. are NOT used internally.
 *
 * Phosphor weight conventions (the `weight` prop):
 *   - regular (default) — most icons. Omit the `weight` prop entirely.
 *   - duotone — dashboard / analytics / chart surfaces (e.g. `SquaresFour`,
 *     `ChartDonut` when representing a dashboard tile).
 *   - fill — solid status glyphs (check, star, circle, avatar user) and any
 *     glyph that must read as solid. Pair with a Tailwind text color class
 *     (`text-white`, `text-primary`) instead of an SVG `fill` attribute.
 *
 * Chrome affordances:
 *   - Dropdown / select caret → `<CaretDown />` (regular, no weight).
 *   - Menu toggle → `<List />` (regular).
 *   - Navigation (secondary area) → regular for default, `weight="fill"` for
 *     the active/hover variant (callers pass the right component).
 *
 * Sizing: match the surrounding chrome with `size-4` / `size-5` Tailwind
 * classes (or `h-4 w-4`). Phosphor honors `className` like react-icons does.
 */

/**
 * Phosphor → Material mapping kept for historical reference (the migration
 * from Material to Phosphor). Not used at runtime.
 */
export const PHOSPHOR_TO_MATERIAL: Record<string, string> = {
	AddressBook: 'MdContacts',
	ArrowsOutLineVertical: 'MdOutlineUnfoldMore',
	ArrowDown: 'MdArrowDownward',
	ArrowLeft: 'MdArrowBack',
	ArrowUp: 'MdArrowUpward',
	Bell: 'MdOutlineNotifications',
	BookOpen: 'MdOutlineMenuBook',
	Briefcase: 'MdBusinessCenter',
	CalendarBlank: 'MdCalendarMonth',
	CaretDown: 'MdArrowDropDown',
	CaretLeft: 'MdChevronLeft',
	CaretRight: 'MdChevronRight',
	CaretUp: 'MdArrowDropUp',
	ChartDonut: 'MdDonutSmall',
	Check: 'MdCheck',
	CheckSquare: 'MdCheckBox',
	Circle: 'MdCircle',
	ClockClockwise: 'MdHistory',
	Code: 'MdCode',
	Columns: 'MdOutlineViewColumn',
	DotsSixVertical: 'MdDragIndicator',
	DotsThree: 'MdMoreHoriz',
	DotsThreeVertical: 'MdMoreVert',
	DownloadSimple: 'MdFileDownload',
	Folder: 'MdFolder',
	Funnel: 'MdFilterList',
	GearSix: 'MdOutlineSettings',
	GraduationCap: 'MdSchool',
	Headset: 'MdHeadset',
	Link: 'MdLink',
	List: 'MdMenu',
	MagnifyingGlass: 'MdSearch',
	Megaphone: 'MdCampaign',
	Palette: 'MdPalette',
	Pencil: 'MdOutlineEdit',
	PencilSimple: 'MdOutlineEdit',
	Power: 'MdPowerSettingsNew',
	PuzzlePiece: 'MdExtension',
	Question: 'MdOutlineHelp',
	Receipt: 'MdReceipt',
	SignOut: 'MdLogout',
	Smiley: 'MdOutlineEmojiEmotions',
	SquaresFour: 'MdOutlineGridView',
	Square: 'MdCheckBoxOutlineBlank',
	Star: 'MdStar',
	Storefront: 'MdAddBusiness',
	TagSimple: 'MdSell',
	Trash: 'MdDelete',
	TreeStructure: 'MdAccountTree',
	Tray: 'MdInbox',
	User: 'MdPerson',
	Users: 'MdPeople',
	Warning: 'MdWarningAmber',
	X: 'MdClose',
};
