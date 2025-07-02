import type { CLICommand } from '../types'

export default function CommandHelp({ registry }: { registry: Record<string, CLICommand> }) {

  return (
    <ul>
      {Object.entries(registry).map(([name, cmd]) => (
        <li key={name}>
          <code className='text-yellow-300'>{name}</code> - {cmd.description}
        </li>
      ))}
    </ul>
  )
}

