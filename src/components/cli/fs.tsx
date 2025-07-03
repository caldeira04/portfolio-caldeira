import AboutMe from "../aboutme"
import Projects from "../projects"
import TechStack from "../techstack"
import Tools from "../tools"

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
          'aboutme.txt': {
            type: 'file',
            content: <AboutMe />

          },
          'about.sh': {
            type: 'file',
            content: `#!/usr/bin/env bash

whoami
echo
cat aboutme.txt;
echo
cat tools.txt;
echo
cat techstack.txt;
echo
cat projects.txt;
echo
echo "caso tenha se perdido, pode scrollar pra cima pra ver o resto :)"
`,
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
