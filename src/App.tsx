import './App.css'
import Terminal from './components/terminal'
import { useState } from 'react'

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  return (
    <main className={`font-geist-mono w-full min-h-screen bg-[url(./assets/bay.JPG)] bg-cover bg-center text-white p-8 ${isTerminalOpen ? '' : 'flex items-center justify-center'} `}>
      <div className='flex items-center justify-center'>
        <button
          className='p-2 text-white flex flex-col gap-2 items-center justify-center'
          onClick={() => setIsTerminalOpen(prev => !prev)}
          hidden={isTerminalOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-terminal-icon lucide-square-terminal"><path d="m7 11 2-2-2-2" /><path d="M11 13h4" /><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /></svg>
          <span>Terminal</span>
        </button>
      </div>
      <Terminal
        isOpen={isTerminalOpen}
        setTerminalOpen={setIsTerminalOpen}
      />
    </main>
  )
}

export default App
