'use client'

import { Link } from '@tanstack/react-router'
import { BellRing, Globe, LeafyGreenIcon } from 'lucide-react'

import NavData from '#/components/shadcn-space/blocks/topbar-05/data'
import {
	NavButton,
	NavDropdown,
} from '#/components/shadcn-space/blocks/topbar-05/header/desktop-nav'
import LanguageDropdown from '#/components/shadcn-space/blocks/topbar-05/header/dropdown-language'
import ProfileDropdown from '#/components/shadcn-space/blocks/topbar-05/header/dropdown-profile'
import NotificationDropdown from '#/components/shadcn-space/blocks/topbar-05/header/notification-dropdown'
import type { NavGroup } from '#/components/shadcn-space/blocks/topbar-05/types'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { Button } from '#/components/ui/button'
import {
	NavigationMenu,
	NavigationMenuList,
} from '#/components/ui/navigation-menu'
import { Separator } from '#/components/ui/separator'
// import { SidebarTrigger } from '#/components/ui/sidebar'

export default function Header() {
	return (
		<header className='bg-card sticky top-0 z-50 border-b'>
			<div className='mx-auto flex items-center justify-between gap-6 px-4 py-2 sm:px-6'>
				<div className='flex items-center gap-4'>
					{/* <SidebarTrigger className='[&_svg]:size-5! cursor-pointer' /> */}
					{/* <Separator
						orientation='vertical'
						className='hidden h-4! sm:block self-center!' */}
					{/* /> */}
					<Button render={<Link to='/projects' />} variant='ghost' nativeButton>
						<span className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-zinc-950'>
							<LeafyGreenIcon className='h-4 w-4' />
						</span>
						<span>Underleaf</span>
					</Button>

					<div className='hidden lg:flex items-center justify-between'>
						<NavigationMenu>
							<NavigationMenuList className='space-x-0'>
								{(NavData as NavGroup[]).map((item) => {
									if (item.type === 'dropdown' && item.items) {
										return (
											<NavDropdown
												key={item.label}
												label={item.label}
												Icon={item.icon}
												items={item.items}
											/>
										)
									}
									return (
										<NavButton
											key={item.label}
											label={item.label}
											Icon={item.icon}
											href={item.href}
										/>
									)
								})}
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>

				<div className='flex items-center gap-2.5'>
					<NotificationDropdown
						defaultOpen={false}
						align='center'
						trigger={
							<div className='rounded-full p-2 hover:bg-accent relative before:absolute before:bottom-0 before:left-1/2 before:z-10 before:w-2 before:h-2 before:rounded-full before:bg-red-500 before:top-1'>
								<BellRing className='size-4' />
							</div>
						}
					/>
					<LanguageDropdown
						trigger={
							<Button
								id='language-dropdown-trigger-05'
								variant='ghost'
								size='icon'
								className='focus-visible:ring-0! focus-visible:shadow-none! rounded-full! hover:bg-accent/80! cursor-pointer'
								suppressHydrationWarning
							>
								<Globe size={16} />
							</Button>
						}
					/>
					<ProfileDropdown
						trigger={
							<Button
								id='profile-dropdown-trigger-05'
								variant='ghost'
								size='icon'
								className='size-7 rounded-full cursor-pointer'
								suppressHydrationWarning
							>
								<Avatar className='size-7 rounded-full'>
									<AvatarImage src='https://images.shadcnspace.com/assets/profiles/user-11.jpg' />
									<AvatarFallback>NJ</AvatarFallback>
								</Avatar>
							</Button>
						}
					/>
				</div>
			</div>
		</header>
	)
}
