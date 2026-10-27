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

export default defineConfig({
  lang: 'zh-CN',
  title: 'Frontend',
  description: 'Web 前端知识库',
  base: '/frontend/',
  ignoreDeadLinks: true,
  themeConfig: {
    search: { provider: 'local' },
    outline: { label: '本页目录' },
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
