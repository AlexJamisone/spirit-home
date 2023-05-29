import type { IconType } from 'react-icons';
import { FaTelegramPlane } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import { SlSocialInstagram, SlSocialVkontakte } from 'react-icons/sl';

type SocialLinksType = {
	icon: IconType;
	href: string;
	alt: string;
	color: string;
};

export const socialLinks: SocialLinksType[] = [
	{
		icon: IoLogoYoutube,
		alt: 'youtube',
		href: 'https://www.youtube.com/channel/UCi4jdXk-SNNRaiLQK3hNfqA',
		color: '#E53E3E',
	},
	{
		alt: 'telegram',
		href: 'https://t.me/spiritom',
		icon: FaTelegramPlane,
		color: '#2AABEE',
	},
	{
		alt: 'vk',
		href: 'https://vk.com/spirit.home',
		icon: SlSocialVkontakte,
		color: '#2B6CB0',
	},
	{
		alt: 'insta',
		href: 'https://instagram.com/spirit.h.om.e',
		icon: SlSocialInstagram,
		color: '#FF0080',
	},
];
