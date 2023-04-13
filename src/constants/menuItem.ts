import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BsBookmarks } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoIosAddCircleOutline } from "react-icons/io";
import { SlHandbag } from "react-icons/sl";
import { TbBrandProducthunt } from "react-icons/tb";

export const menuItems = [
	{
		icon: AiOutlineUser,
		title: 'Профиль',
		path: '/profile/main',
		type: 'USER',
	},
	{
		icon: HiOutlineClipboardDocumentList,
		title: 'Заказы',
		path: '/profile/orders',
		type: 'USER',
	},
	{
		icon: BsBookmarks,
		title: 'Избранное',
		path: '/profile/favorites',
		type: 'USER',
	},
	{
		icon: FiSettings,
		title: 'Настройки',
		path: '/profile/settings',
		type: 'USER',
	},
	{
		icon: AiOutlineHome,
		title: 'Home',
		path: '/admin/statictic',
		type: 'ADMIN',
	},
	{
		icon: HiOutlineClipboardDocumentList,
		title: 'Заказы',
		path: '/admin/orders',
		type: 'ADMIN',
	},
	{
		icon: TbBrandProducthunt,
		title: 'Продукт',
		path: '/admin/product',
		type: 'ADMIN',
	},
	{
		icon: IoIosAddCircleOutline,
		title: 'Категории',
		path: '/admin/categorys',
		type: 'ADMIN',
	},
];
