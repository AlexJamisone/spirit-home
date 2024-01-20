import { ElementType } from 'react';
import Instagram from '~/assets/social/Instagram';
import Telegram from '~/assets/social/Telegram';
import Youtube from '~/assets/social/Youtube';

type SocialLinksType = {
	child: ElementType;
	href: string;
	alt: string;
};

export const socialLinks: SocialLinksType[] = [
	{
		alt: 'insta',
		href: 'https://instagram.com/spirit.h.om.e',
		child: Instagram,
	},
	{
		child: Youtube,
		alt: 'youtube',
		href: 'https://www.youtube.com/channel/UCi4jdXk-SNNRaiLQK3hNfqA',
	},
	{
		alt: 'telegram',
		href: 'https://t.me/spiritom',
		child: Telegram,
	},
];
