/**
 * Site-wide identity. Change the name here and it updates across the
 * header, footer, page titles and metadata.
 */
export const site = {
  name: 'NeoWorks',
  fullName: 'NeoWorks Studio',
  description:
    'The official home of NeoWorks Studio — games, news and community discussion.',
} as const

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/forum', label: 'Forum' },
  { to: '/news', label: 'News' },
  { to: '/about', label: 'About' },
] as const
