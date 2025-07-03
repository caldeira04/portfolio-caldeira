import AboutMe from "../aboutme"
import Projects from "../projects"
import TechStack from "../techstack"
import Tools from "../tools"
import CommandAboutMe from "./commands/about-sh"

export type FileNode = {
  type: 'file' | 'dir'
  content?: React.ReactNode
  children?: Record<string, FileNode>
}

export const fakeFs: Record<string, FileNode> = {
  '/': {
    type: 'dir',
    children: {
      'aboutme': {
        type: 'dir',
        children: {
          'tools.txt': {
            type: 'file',
            content: <Tools />,
          },
          'techstack.txt': {
            type: 'file',
            content: <TechStack />,
          },
          'projects.txt': {
            type: 'file',
            content: <Projects />,
          },
          'about.sh': {
            type: 'file',
            content: <CommandAboutMe />,
          }
        },
      },
    },
    content: <AboutMe />,
  }
}

export const resolvePath = (cwd: string, path: string): string => {
  if (path === '..') return cwd === '/' ? '/' : cwd.split('/').slice(0, -1).join('/') || '/'
  if (path.startsWith('/')) return path
  return cwd === '/' ? `/${path}` : `${cwd}/${path}`
}

export const getNode = (path: string): FileNode | null => {
  const parts = path.split('/').filter(Boolean)
  let node: FileNode | undefined = fakeFs['/']
  for (const part of parts) {
    if (!node?.children || !node.children[part]) return null
    node = node.children[part]
  }
  return node || null
}
