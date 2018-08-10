import './message.sass'

const replaceTags = (message, formData) => {
  if(typeof message == 'string') {
    const tags = message.match(/{\w+}/g);
    if(tags) {
      tags.forEach(tag => {
        tag = tag.slice(1,-1)
        message = message.replace(`{${tag}}`, formData[tag] || '')
      })
    }
  }
  
  return message;
}

export default (props) => {
  const {type, children, formData, avatar, fields, setFormData, sendQueuedMessages, currentMessage, lastMessage, setLastMessage, url} = props;
  let message = children;

  if(type === 'received' || type === 'sent') message = replaceTags(children, formData)
  if(type === 'redirect') location.href = url

  return(
    type == 'sent' ?
      <div className="message-content">
        <div className="message-sent">
          {message}
        </div>
      </div>
    :
    type == 'received' ?
      <div className="message-wrapper">
        <div className={avatar ? 'avatar':'placeholder'}></div>
        <div className="message-content">
          <div className="message-received">
          {message}
          </div>
        </div>
      </div>
    :
    type == 'form' ?
      <div className="message-form">
        {currentMessage === lastMessage ?
          fields.map((field, i) =>

            field.type == 'text' ?
              <form key={i} onSubmit={(ev) => {ev.preventDefault(); sendQueuedMessages();}}>
                <input type="text" placeholder={field.placeholder} value={formData[field.name]} onChange={(ev) => setFormData(field.name, ev.target.value)} />
              </form>
            :
            field.type == 'options' ?
              <div key={i}>
                {field.options.map((option, i) =>
                  <button key={i} onClick={(ev) => {setFormData(field.name, option); sendQueuedMessages(); }}>{option}</button>
                )}
              </div>
            :
            null
          
          ):
          <div className="answer-again" onClick={() => setLastMessage(currentMessage)}>Responder novamente</div> 
        }
      </div>
    :
    null
  )
}