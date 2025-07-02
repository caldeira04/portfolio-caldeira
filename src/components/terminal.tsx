import { useState, useEffect } from "react"
import AboutMe from './aboutme'
import Projects from './projects'
import TechStack from './techstack'
import Whoami from './whoami'
import Tools from './tools'

interface Props {
  isOpen: boolean
  setTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Terminal({ isOpen, setTerminalOpen }: Props) {
  const [command, setCommand] = useState('')
  const [isCommand, setIsCommand] = useState(false)
  const [scriptStarted, setScriptStarted] = useState(false)
  const [step, setStep] = useState(0)
  const availableCommands = [
    { command: './about.sh', description: 'about me', component: <CommandAboutMe /> },
    { command: 'exit', description: 'exit terminal', component: null },
    { command: 'help', description: 'help', component: <CommandList /> },
  ]

  function CommandList() {
    return (
      <>
        <ul>
          {availableCommands.map(cmd => (
            <li key={cmd.command}>{cmd.command} - {cmd.description}</li>
          ))}
        </ul>
        <>
          <br />
          <p>(END)<span className='animate-pulse'>_</span></p>
        </>
      </>
    )
  }

  function CommandAboutMe() {
    return (
      <>
        <Whoami />
        <br />
        <AboutMe />
        <br />
        <Tools />
        <br />
        <TechStack />
        <br />
        <Projects />
        <>
          <br />
          <p>(END)<span className='animate-pulse'>_</span></p>
        </>
      </>
    )
  }

  function RenderCommand() {
    const foundCommand: any = availableCommands.find(cmd => cmd.command === command.trim())
    if (!foundCommand) return <p>zsh: command not found: {command}</p>
    return foundCommand.component
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const found = availableCommands.find(cmd => cmd.command === command.trim())
    if (!found) {
      setIsCommand(false)
      setScriptStarted(false)
      setCommand('')
      return
    }

    setIsCommand(true)
    setScriptStarted(true)

    if (command.trim() === 'exit') {
      setTimeout(() => {
        setTerminalOpen(false)
        setScriptStarted(false)
        setCommand('')
        setStep(0)
      }, 300)
    }
  }

  useEffect(() => {
    if (command.trim() !== './about.sh') return
    if (step >= 6) return
    const timeout = setTimeout(() => {
      setStep(prev => prev + 1)
    }, 100)

    return () => clearTimeout(timeout)
  }, [step])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('ESCAPE')
        setScriptStarted(false)
        setTerminalOpen(false)
        setCommand('')
        setStep(0)
      }
      if (e.key === 'q') {
        console.log('Q')
        setScriptStarted(false)
        setCommand('')
        setStep(0)
      }
      if (!isCommand) {
        if (e.key === 'Enter') {
          console.log('ENTER')
          setScriptStarted(false)
          setStep(0)
        }
        if (e.key === 'ArrowUp') {
          console.log('UP')
          setCommand('./about.sh')
          setStep(prev => prev - 1)
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)

  }, [setTerminalOpen])

  if (!isOpen) return null

  return (
    <div className='p-4 h-96 overflow-auto bg-black/85 rounded-md shadow-md border-2 border-[#ebbcba]'>
      <p>bem vindo ao meu portfolio!</p>
      <p>utilize 'help' para ver uma lista de comandos disponíveis</p>
      <p>utilize a tecla Esc ou o comando 'exit' para sair</p>
      <br />
      {scriptStarted ? (
        <RenderCommand />
      ) : (
        <form onSubmit={handleSubmit}>
          <span className='text-green-500'>
            <span className="text-teal-500">~</span> ❯ <input
              type='text'
              placeholder='./about.sh'
              value={command}
              className='text-white' onChange={(e) => setCommand(e.target.value)}
              autoFocus
            />
          </span>
        </form>
      )}
    </div>
  )
}
