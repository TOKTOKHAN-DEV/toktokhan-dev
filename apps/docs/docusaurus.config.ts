// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
import { themes as prismThemes } from 'prism-react-renderer'

import tailwindPlugin from './plugins/tailwind-plugin.cjs'

const BASE_THEME = prismThemes.dracula

const THEME = {
  ...BASE_THEME,
  plain: {
    ...BASE_THEME.plain,
    backgroundColor: '#000000',
  },
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  plugins: [tailwindPlugin],
  future: {
    experimental_router: 'browser',
  },
  title: 'Toktokhan Front-end Documentation',
  tagline: '똑똑한개발자 프론트엔드 문서입니다.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://toktokhan-dev-docs.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'toktokhan-dev', // Usually your GitHub org/user name.
  projectName: 'TokDocs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          sidebarItemsGenerator: async ({
            defaultSidebarItemsGenerator,
            ...args
          }) => {
            const sidebarItems = await defaultSidebarItemsGenerator(args)
            return reverseSidebarItems(sidebarItems)
          },
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        fromExtensions: ['md'],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      image: 'img/ui/logo.webp',
      algolia: {
        appId: 'FX1MB92IM7',
        apiKey: '9868a93249fc68bf66c1fa15e5b57672',
        indexName: 'toktokhan-dev-vercel',
        contextualSearch: true,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        // title: 'TokDocs',
        logo: {
          href: '/',
          alt: 'TokDocs Logo',
          src: 'img/ui/logo.webp',
          srcDark: 'img/ui/logo.webp',
          width: 108,
        },
        items: [
          {
            // type: 'doc',
            // docId: 'intro',
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
            className: 'nav-item',
          },
          // { to: '/blog', label: 'Blog', position: 'left' },
          {
            // type: 'doc',
            // docId: 'api/index',
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            label: 'API',
            position: 'left',
            className: 'nav-item',
          },
          {
            type: 'docSidebar',
            sidebarId: 'onboardingSidebar',
            label: 'Onboarding',
            position: 'left',
            className: 'nav-item',
          },
          {
            href: 'https://github.com/TOKTOKHAN-DEV/toktokhan-dev',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          // {
          //   type: 'docsVersionDropdown',
          //   position: 'right',
          //   dropdownActiveClassDisabled: true,
          // },
        ],
      },
      // footer: {
      //   logo: {
      //     href: '/',
      //     src: '/img/tok-docs-logo.svg',
      //     srcDark: '/img/tok-docs-logo.svg',
      //     alt: 'TokTokhan Front-end Documentation | Tok Docs',
      //     height: '36px',
      //   },
      //   links: [
      //     // {
      //     //   title: 'Docs',
      //     //   items: [
      //     //     {
      //     //       label: 'Tutorial',
      //     //       to: '/docs/intro',
      //     //     },
      //     //   ],
      //     // },
      //     // {
      //     //   title: 'Community',
      //     //   items: [
      //     //     {
      //     //       label: 'Stack Overflow',
      //     //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //     //     },
      //     //     {
      //     //       label: 'Discord',
      //     //       href: 'https://discordapp.com/invite/docusaurus',
      //     //     },
      //     //     {
      //     //       label: 'Twitter',
      //     //       href: 'https://twitter.com/docusaurus',
      //     //     },
      //     //   ],
      //     // },
      //     // {
      //     //   title: 'More',
      //     //   items: [
      //     //     {
      //     //       label: 'Blog',
      //     //       to: '/blog',
      //     //     },
      //     //     {
      //     //       label: 'GitHub',
      //     //       href: 'https://github.com/TOKTOKHAN-DEV/toktokhan-dev/tree/main',
      //     //     },
      //     //   ],
      //     // },
      //   ],
      //   // copyright: `Copyright © ${new Date().getFullYear()} TokDocs, Inc. Built with Docusaurus.`,
      // },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    },
}

const API_ORDERS = [
  'Overview',
  'Universal',
  'react',
  'Node',
  'Cli',
  'cli-plugins',
]

const reverseSidebarItems = (items) => {
  const sort = (orders) => {
    return items.sort((a, b) => {
      const idx_a = orders.indexOf(a.label)
      const idx_b = orders.indexOf(b.label)
      const notFoundToEnd = (idx) => (idx === -1 ? 9999 : idx)

      return notFoundToEnd(idx_a) - notFoundToEnd(idx_b)
    })
  }
  // const isApi = items.some((item) => item.label === 'React')

  return sort(API_ORDERS)
  return items
}

export default config
