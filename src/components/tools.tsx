export default function Tools() {
  return (
    <div>
      <h1 className='font-bold text-green-500'><span className="text-teal-500">~/aboutme</span> ❯ cd tools && ls -la</h1>
      <ul>
        <li className='list-inside'>
          <div>
            - <a href='https://github.com/caldeira/nixos' className='underline'>nixos-config</a>
            <p>configuração geral do meu SO. atualmente usando NixOS como daily</p>
          </div>
          <div>
            - <a href='https://github.com/caldeira/init.lua' className='underline'>init.lua (nvim-config)</a>
            <p>configuração atual do meu ambiente de desenvolvimento. atualmente usando neovim</p>

          </div>
        </li>

      </ul>
    </div>
  )
}
