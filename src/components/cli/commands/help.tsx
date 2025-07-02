import { buildCommandRegistry } from '../registry'

export default function CommandHelp() {
  const commandRegistry = buildCommandRegistry('', () => { })

  return (
    <ul>
      {Object.entries(commandRegistry).map(([name, cmd]) => (
        <li key={name}>
          <code className='text-yellow-300'>{name}</code> - {cmd.description}
        </li>
      ))}
    </ul>
  )
}

