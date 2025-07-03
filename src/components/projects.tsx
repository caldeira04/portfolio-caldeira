export default function Projects() {
  return (
    <div>
      <ul>
        <li className='list-inside'>
          <div>
            - <a href='https://sndtrackr.vercel.app' className='underline'>sndtrackr</a>
            <p>music tracker, semelhante ao letterboxd, mas para músicas.</p>
            <p>front-end desenvolvido com figma, escrito utilizando vite, react e tailwindcss. back-end escrito com express, utilizando prisma ORM, postgresql e cloudinary para gerenciamento de dados, e JWT para autenticação. atualmente em processo de refatoração para melhor componentização, otimização, e inclusão de tecnologias como Nextjs e Convex</p>
          </div>
        </li>
        <li className='list-inside'>
          <div>

            - <a href='https://comercium.vercel.app' className='underline'>comercium</a>

            <p>saas de gerenciamento para lojas de varejo.</p>
            <p>front-end escrito com nextjs e componentes da biblioteca shadcn. back-end inteiramente construído com convex. atualmente em etapa de testes, sendo usado por lojas de conveniência locais.</p>
          </div>
        </li>
      </ul>
    </div>
  )
}
