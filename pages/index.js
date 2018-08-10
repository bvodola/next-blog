import Link from 'next/link'
import Nav from '../components/nav'
import './index.sass'

export default () => 
  <div className="home">
    <Nav logo={'http://indenizamais.com.br/static/img/logo-indeniza-mais.png'} phone={'(11) 4184-4343'} />
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

    <div className="content">
      <div className="icon">
        <img src="/static/img/stethoscope.png" alt=""/>
      </div>
      <article>
        <h3>Conheça seus direitos nos casos de erro médico</h3>
        <p>
          Caso tenha ficado insatisfeito ou insatisfeita com algum procedimento <strong>médico</strong> ou <strong>odontoógico</strong>,
          você deve, em primeiro lugar, procurar uma segunda opinião de um profissional da saúde. Caso o erro seja realmente constatado,
          a melhor maneira de fazer valer seu direito é através de uma ação judicial.
        </p>

 
        <h3>O que caracteriza um erro médico?</h3>

        <p>
          Para que se possa realmente constatar que houve erro médico é preciso comprovar ao menos um dos três:
        </p>
        <ul>
          <li>Imperícia: falta de conhecimento</li>
          <li>Imprudência: descuido</li>
          <li>Negligência: atitude fora do esperado</li>
        </ul>

        <p>
          Não apenas o profissional da saúde, mas também em alguns casos, <strong>hospitais,
          clínicas e planos de saúde também podem ser responsabilizados</strong>.
          Cada caso deve ser analisado com cuidado.
        </p>
      </article>
    </div>

    <div className="cta">
      <Link href='/chat'>
        <button>Verificar se posso ser atendido</button>
      </Link>
    </div>
  </div>