import AboutMe from '../../aboutme'
import Projects from '../../projects'
import TechStack from '../../techstack'
import Whoami from '../../whoami'
import Tools from '../../tools'

export default function CommandAboutMe() {
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
      <br />
      <p>caso tenha se perdido, pode scrollar pra cima pra ver o resto :)</p>
    </>
  )
}
