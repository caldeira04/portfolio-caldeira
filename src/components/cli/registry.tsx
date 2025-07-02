import { resolvePath, getNode } from './fs'
import CommandHelp from './commands/help'
import CommandAboutMe from './commands/about-sh'
import Whoami from '../whoami'
import type { CLICommand } from './types'

interface Props {
  cwd: string
  setCwd: (path: string) => void
}

export const buildCommandRegistry = ({ cwd, setCwd }: Props): Record<string, CLICommand> => ({
  ls: {
    description: 'lista os arquivos e diretórios do diretório atual',
    run: (args: string[]) => {
      const flags = args.filter(arg => arg.startsWith('-'))
      const paths = args.filter(arg => !arg.startsWith('-'))
      const target = paths[0] ? resolvePath(cwd, paths[0]) : cwd
      const node = getNode(target)

      if (!node || node.type !== 'dir') return `"${target}": No such file or directory`

      const entries = Object.entries(node.children!)
      const isLong = flags.includes('-la') || flags.includes('-l')

      if (isLong) {
        return entries.map(([name, node]) => {
          const type = node.type === 'dir' ? 'd' : '-'
          return `${type}rwxrwxrwx  1 root root Oct 13 20:00 ${name}`
        }).join('\n')
      }

      return entries.map(([name]) => name).join('\n')
    }
  },
  cd: {
    description: 'muda o diretório atual',
    run: (args: string[]) => {
      if (!args[0]) {
        setCwd('/')
        return ''
      }
      const path = resolvePath(cwd, args[0])
      const node = getNode(path)
      if (!node || node.type !== 'dir') return `cd: No such file or directory: ${args[0]}`
      setCwd(path)
      return ''
    }
  },
  cat: {
    description: 'exibe o conteúdo de um arquivo',
    run: (args: string[]) => {
      if (!args[0]) return 'cat: missing argument'
      const path = resolvePath(cwd, args[0])
      const node = getNode(path)
      if (!node) return `cat: ${args[0]}: No such file or directory`
      if (node.type !== 'file') return `cat: ${args[0]}: Is a directory`
      return node.content
    }
  },
  pwd: {
    description: 'mostra o diretório atual',
    run: () => cwd
  },
  './about.sh': {
    description: 'roda o script do portfólio',
    run: () => <CommandAboutMe />
  },
  whoami: {
    description: 'mostra informações sobre o usuário atual',
    run: () => <Whoami />
  },
  help: {
    description: 'mostra todos os comandos disponíveis',
    run: (args: string[], registry: Record<string, CLICommand>) => {
      if (args.length > 0) return `help: too many arguments`
      return <CommandHelp registry={registry} />
    }
  },
  exit: {
    description: 'sai do terminal',
    run: () => void 0
  },
  clear: {
    description: 'limpa o histórico do terminal',
    run: () => void 0
  }
})
