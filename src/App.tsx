import './App.css'
import AboutMe from './components/aboutme'
import Projects from './components/projects'
import TechStack from './components/techstack'
import Whoami from './components/whoami'
import Tools from './components/tools'
import { useEffect, useState } from 'react'

function App() {
  const [command, setCommand] = useState('')
  const [scriptStarted, setScriptStarted] = useState(false)
  const [isAbout, setIsAbout] = useState(false)
  const [step, setStep] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (command) {
      setScriptStarted(true)
      if (command.trim() === './about.sh') {
        setIsAbout(true)
      } else {
        setIsAbout(false)
        setTimeout(() => {
          setScriptStarted(false)
        }, 1000)
      }
    }
  }

  useEffect(() => {
    if (!isAbout) return
    if (step >= 6) return
    const timeout = setTimeout(() => {
      setStep(prev => prev + 1)
    }, 100)

    return () => clearTimeout(timeout)
  }, [step, isAbout])

  return (
    <main className='font-geist-mono w-full min-h-screen bg-[url(./assets/bay.JPG)] bg-cover bg-center text-white p-8'>
      <div className='p-4 bg-black/85 rounded-md shadow-md border-2 border-[#ebbcba]'>
        {!scriptStarted ? (
          <form onSubmit={handleSubmit}>
            <span className='text-green-500'>
              <span className="text-teal-500">~</span> ❯ <input
                type='text'
                placeholder='./about.sh'
                className='text-white' onChange={(e) => setCommand(e.target.value)}
                autoFocus
              />
            </span>
          </form>

        ) : isAbout ? (
          <>
            {step >= 1 && <Whoami />}
            {step >= 2 && <><br /><AboutMe /></>}
            {step >= 3 && <><br /><Tools /></>}
            {step >= 4 && <><br /><TechStack /></>}
            {step >= 5 && <><br /><Projects /></>}
            {step >= 6 && (
              <>
                <br />
                <p>(END)<span className='animate-pulse'>_</span></p>
              </>
            )}
          </>
        ) : (
          <p>zsh: command not found: {command}</p>
        )}
      </div>
    </main>
  )
}

export default App
