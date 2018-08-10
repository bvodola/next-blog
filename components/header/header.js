import './header.sass'
import Link from 'next/link'

export default () =>
<header>
  <div className="cta">
    <h1>
      Foi vítima de erro médico ou odontológico?
      Ficou insatisfeito com os resultados obtidos?
    </h1>
    <h2>Fale conosco e entenda seus direitos</h2>
    <Link href='/chat'>
      <button>Verificar se posso ser atendido</button>
    </Link>
  </div>
</header>