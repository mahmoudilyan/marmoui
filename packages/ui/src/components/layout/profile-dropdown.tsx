import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuGroup,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from '../dropdown-menu';
import { Button } from '../button';
import { Avatar, AvatarFallback } from '../avatar';
import { Briefcase, GearSix, Users, Power, PuzzlePiece, Receipt, SignOut } from '@phosphor-icons/react';

const ProfileDropdown = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative hover:bg-transparent active:bg-transparent p-2">
					<div className="flex items-center gap-2">
						<div className="relative">
							<Avatar className="w-8 h-8 rounded-lg">
								<AvatarFallback className="rounded-lg bg-primary-600 text-white" variant="normal">
									M
								</AvatarFallback>
							</Avatar>
							<Avatar className="absolute -top-1 -left-1 w-4 h-4 border border-gray-800">
								<AvatarFallback className="text-[10px] bg-gray-700 text-white" variant="normal">
									A
								</AvatarFallback>
							</Avatar>
						</div>
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80" align="end" side="right">
				<div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center gap-3 pr-12">
						<Avatar className="w-12 h-12 rounded-lg">
							<AvatarFallback className="rounded-lg bg-primary-600 text-white" variant="normal">
								AU
							</AvatarFallback>
						</Avatar>
						<div className="space-y-1">
							<p className="font-medium">Alex User</p>
							<p className="text-sm text-gray-600 dark:text-gray-400">Marmo Workspace</p>
						</div>
					</div>
				</div>

				<DropdownMenuGroup className="mt-1">
					<DropdownMenuSub>
						<DropdownMenuSubTrigger className="justify-between">
							<div className="px-2 py-0 space-y-1">
								<p className="font-medium">Marmo Studio</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">Change workspace</p>
							</div>
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuRadioGroup value="Marmo Studio">
								<DropdownMenuRadioItem value="Marmo Studio">Marmo Studio</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="Design Lab">Design Lab</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem>
				<GearSix className="mr-2 w-4 h-4" />
				Settings
				</DropdownMenuItem>
				<DropdownMenuItem>
				<Users className="mr-2 w-4 h-4" />
				Team
				</DropdownMenuItem>
				<DropdownMenuItem>
				<Power className="mr-2 w-4 h-4" />
				Integrations
				</DropdownMenuItem>
				<DropdownMenuItem>
				<PuzzlePiece className="mr-2 w-4 h-4" />
				Add-ons
				</DropdownMenuItem>
				<DropdownMenuItem>
				<Receipt className="mr-2 w-4 h-4" />
				Billing
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem>
				<Briefcase className="mr-2 w-4 h-4" />
				Support
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem className="mb-1">
				<SignOut className="mr-2 w-4 h-4" />
				Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropdown;
