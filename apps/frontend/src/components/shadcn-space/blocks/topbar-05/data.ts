import { type FileRoutesByPath, RouteLinkEntry } from '@tanstack/react-router'
import {
	BringToFront,
	CalendarHeart,
	ChartColumnBig,
	CircleArrowDown,
	Flag,
	Form,
	GalleryVerticalEnd,
	Grid2x2Plus,
	LayersPlus,
	type LucideIcon,
	PanelRightClose,
	Pentagon,
	Presentation,
	RectangleCircle,
	Shapes,
	Shredder,
	Zap,
} from 'lucide-react'

import type { FileRoutesByFullPath } from '#/routeTree.gen'

type NavItem = {
	type: 'link' | 'dropdown'
	label: string
	icon: LucideIcon
	href: keyof FileRoutesByFullPath
	items?: NavItem[]
}

const NavData: NavItem[] = [
	// {
	// 	type: 'dropdown',
	// 	label: 'Dashboards',
	// 	icon: LayersPlus,
	// 	items: [
	// 		{ label: 'Ecommerce', icon: Grid2x2Plus, href: '#' },
	// 		{ label: 'Analytics', icon: ChartColumnBig, href: '#' },
	// 		{ label: 'Projects', icon: BringToFront, href: '#' },
	// 		{ label: 'Frontend Pages', icon: Form, href: '#' },
	// 		{ label: 'Landing Pages', icon: Presentation, href: '#' },
	// 	],
	// },
	// {
	// 	type: 'dropdown',
	// 	label: 'Shadcn UI',
	// 	icon: Shapes,
	// 	items: [
	// 		{ label: 'Accordian', icon: CircleArrowDown, href: '#' },
	// 		{ label: 'Alert', icon: Flag, href: '#' },
	// 		{ label: 'Bedge', icon: Pentagon, href: '#' },
	// 		{ label: 'Button', icon: RectangleCircle, href: '#' },
	// 		{ label: 'Dropdown', icon: GalleryVerticalEnd, href: '#' },
	// 		{ label: 'Dialog', icon: Zap, href: '#' },
	// 		{ label: 'Drawer', icon: PanelRightClose, href: '#' },
	// 		{ label: 'Datepicker', icon: CalendarHeart, href: '#' },
	// 	],
	// },
	{
		type: 'link',
		label: 'Projetos',
		icon: Shredder,
		href: '/projects/',
	},
	// {
	// 	type: 'link',
	// 	label: 'Docs',
	// 	icon: Shredder,
	// 	href: '#',
	// },
]

export default NavData
