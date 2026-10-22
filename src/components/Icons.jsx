const paths = {
  home: 'M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-9Z M9 21v-6h6v6',
  book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16ZM4 19h16',
  calendar: 'M5 4v3m10-3v3M4 9h12m-9 4h2m3 0h.01M5.5 6h11A1.5 1.5 0 0 1 18 7.5v10a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 17.5v-10A1.5 1.5 0 0 1 5.5 6Z',
  bell: 'M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',
  chart: 'M4 20V10m6 10V4m6 16v-7m4 7H2',
  wallet: 'M4 7a2 2 0 0 1 2-2h12v15H6a2 2 0 0 1-2-2V7Zm0 3h15v5H4m11-2h1',
  file: 'M6 2h8l4 4v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm7 0v5h5M8 13h8m-8 4h8',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m15-7a4 4 0 1 0 0-8m-3 9a4 4 0 1 0-4-4',
  user: 'M20 21a8 8 0 0 0-16 0m12-12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  search: 'm21 21-4.4-4.4m2.4-5.1a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  mail: 'M3 6h18v12H3V6Zm0 1 9 6 9-6',
  check: 'm5 12 4 4L19 6',
  edit: 'm12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z',
  logout: 'M10 17l5-5-5-5m5 5H3m12 8h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4',
  info: 'M12 8h.01M11 12h1v4h1M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
  clock: 'M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
}
export default function Icon({ name, size = 20, strokeWidth = 1.8, className = '' }) {
  return <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.info} /></svg>
}
