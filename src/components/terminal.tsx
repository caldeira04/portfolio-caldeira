import { useEffect, useRef, useState } from "react"
import { buildCommandRegistry } from "./cli/registry"

interface Props {
  isOpen: boolean
  setTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Terminal({ isOpen, setTerminalOpen }: Props) {
  const [command, setCommand] = useState<string>("")
  const [cwd, setCwd] = useState<string>("/")
  const [isLoading, setIsLoading] = useState(true)
  const [history, setHistory] = useState<
    { isError: boolean, cwd: string, input: string, output: React.ReactNode | string }[]
  >([])
  const terminalRef = useRef<HTMLDivElement>(null)
  const commandRegistry = buildCommandRegistry({ cwd, setCwd })

  const parseInput = (input: string) => {
    const [cmd, ...args] = input.split(/\s+/)
    return { cmd, args }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { cmd, args } = parseInput(command)
    if (cmd === "exit") {
      setTimeout(() => {
        setTerminalOpen(false)
        setHistory([])
        setCwd('/')
        setCommand("")
      }, 100)
      return
    }
    if (cmd === "clear") {
      setHistory([])
      setCommand("")
      return
    }

    const found = commandRegistry[cmd]
    const output = found
      ? found.run(args, commandRegistry)
      : `zsh: comando não encontrado: ${cmd}`;
    const error = found ? false : true

    setHistory(prev => [...prev, { isError: error, cwd: cwd, input: command, output }])
    setCommand("")
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        setTerminalOpen(false)
        setHistory([])
        setCwd('/')
        setCommand("")
      }
    })
  })

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      const timeout = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  function LoadSsh() {
    if (isLoading) return <p>ssh: connecting to caldeira@portfolio...</p>

    return (
      <>
        <p>ssh: connected to caldeira@portfolio</p>
        <p>bem vindo ao meu portfolio!</p>
        <p>utilize ./about.sh para ver o portfolio</p>
        <p>ou utilize 'help' para ver uma lista de comandos disponíveis</p>
        <p>utilize a tecla Esc ou o comando 'exit' para sair</p>
        <br />
        {history.map((entry, idx) => (
          <div key={idx}>
            <p className={entry.isError ? 'text-red-500' : 'text-green-500'}>
              ❯ <span className="font-bold">{entry.input}</span>
            </p>
            <div><pre>{entry.output}</pre></div>
          </div>
        ))}
        <br />
        <form onSubmit={handleSubmit}>
          <span className='text-green-500'>
            <span className="text-teal-500">{cwd}</span> ❯ <input
              type='text'
              placeholder='./about.sh'
              value={command}
              className='text-white bg-transparent outline-none'
              onChange={(e) => setCommand(e.target.value)}
              autoFocus
            />
          </span>
        </form>
      </>
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div ref={terminalRef} className='w-[90vw] h-[80vh] overflow-auto bg-black/85 rounded-md shadow-md border-2 border-[#ebbcba] text-white p-4'>
        <LoadSsh />
      </div>
    </div>
  )
}
