import './nav.sass'

export default (props) =>
  <nav>
    <div className="brand">
      <img className="logo" src={props.logo} alt="Logo"/>
    </div>
    <div className="contact">{props.phone}</div>
  </nav>