import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const docsRoot = fileURLToPath(new URL('..', import.meta.url))

type SidebarItem = {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

function titleOf(filename: string) {
  if (filename === 'README.md') return '原文概览'
  return filename.replace(/\.md$/u, '')
}

function walk(dir: string, href: string): SidebarItem[] {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith('.'))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))

  const items: SidebarItem[] = []

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md') || entry.name === 'index.md') continue
    items.push({
      text: titleOf(entry.name),
      link: `${href}/${entry.name.replace(/\.md$/u, '')}`,
    })
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const childDir = path.join(dir, entry.name)
    const childHref = `${href}/${entry.name}`
    const childItems = walk(childDir, childHref)
    const hasIndex = fs.existsSync(path.join(childDir, 'index.md'))
    if (!hasIndex && childItems.length === 0) continue
    items.push({
      text: entry.name,
      link: hasIndex ? `${childHref}/` : undefined,
      items: childItems,
      collapsed: true,
    })
  }

  return items
}

function section(folder: string): SidebarItem[] {
  return [{ text: '概览', link: `/${folder}/` }, ...walk(path.join(docsRoot, folder), `/${folder}`)]
}

const base = '/frontend/'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Frontend',
  description: 'Web 前端知识库',
  base,
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.ico` }],
    ['meta', { name: 'author', content: 'kangduu' }],
  ],
  lastUpdated: true,
  ignoreDeadLinks: true,
  sitemap: {
    hostname: 'https://kangduu.github.io/frontend/',
  },
  markdown: {
    image: { lazyLoading: true },
    container: {
      tipLabel: '提示',
      warningLabel: '注意',
      dangerLabel: '警告',
      infoLabel: '信息',
      detailsLabel: '详情',
      importantLabel: '重要',
      cautionLabel: '警告',
      noteLabel: '注',
    },
  },
  themeConfig: {
    logo: '/logo.png',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '返回',
            displayDetails: '显示详细列表',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    outline: { label: '此页内容' },
    lastUpdated: { text: '上次编辑于' },
    docFooter: { prev: '上一页', next: '下一页' },
    editLink: {
      pattern: 'https://github.com/kangduu/frontend/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/kangduu/frontend' }],
    footer: {
      message: '路漫漫其修远兮，吾将上下而求索',
    },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    skipToContentLabel: '跳至主要内容',
    notFound: {
      title: '页面不存在',
      quote: '路漫漫其修远兮，吾将上下而求索',
      linkText: '返回首页',
      linkLabel: '返回首页',
    },
    nav: [
      { text: '总览', link: '/' },
      { text: 'HTML 与 CSS', link: '/html-css/' },
      { text: 'JavaScript', link: '/javascript/' },
      { text: 'TypeScript', link: '/typescript/' },
      { text: '浏览器', link: '/browser/' },
      { text: '构建', link: '/engineering/' },
      { text: 'React', link: '/react/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'Node.js', link: '/nodejs/' },
      { text: '库索引', link: '/libraries' },
      { text: '附录', link: '/appendix/' },
    ],
    sidebar: {
      '/html-css/': section('html-css'),
      '/javascript/': section('javascript'),
      '/typescript/': section('typescript'),
      '/browser/': section('browser'),
      '/engineering/': section('engineering'),
      '/react/': section('react'),
      '/vue/': section('vue'),
      '/nodejs/': section('nodejs'),
      '/appendix/': section('appendix'),
    },
  },
})
