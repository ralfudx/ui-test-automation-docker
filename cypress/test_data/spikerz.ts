export interface SpikerzData {
  logoText: string;
  overviewHeaderText: string;
  logoutText: string;
  socialConnectHeaderText: string;
  socialConnectSubHeaderText: string;
  socialConnectUrlSlug: string;
  menuTitles: string[];
  socialConnectCardNames: string[];
  confirmDetailsText: string;
  youtubeHandle: string;
}

const spikerz: Record<DataENV, SpikerzData> = {
  dev: {
    logoText: 'logo',
    overviewHeaderText: ', Ellesse',
    logoutText: 'Logout',
    socialConnectHeaderText: 'Hi Ellesse',
    socialConnectSubHeaderText: 'Choose a platform to connect',
    socialConnectUrlSlug: 'social-connect/',
    menuTitles: [
      'Overview',
      'Alerts',
      'Asset permissions',
      'Account protection',
      'DM protection',
      'Data breaches',
      'Backup',
      'Impersonators',
      'Comments cleaner',
      'Content quality',
      'Content checker',
      'Shadowban',
      'Bot',
      'Insights',
    ],
    socialConnectCardNames: [
      'Instagram',
      'Tiktok',
      'Facebook',
      'Youtube',
      'X',
      'LinkedIn',
    ],
    confirmDetailsText: 'Confirm details',
    youtubeHandle: '@dina_bakery_shop',
  }
};

export default spikerz;
