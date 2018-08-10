import './chat.sass'
import React from 'react'
import Message from  '../../components/message'
import Nav from '../../components/nav'

const messageDB = [
  {
    type: 'received',
    content: 'Olá, meu nome é Douglas. Sou consultor especialista em erros médicos'
  },
  {
    type: 'received',
    content: 'Vou te ajudar a resolver seu problema. Mas primeiro preciso entender um pouco sobre seu caso.'
  },
  {
    type: 'received',
    content: 'Quem foi a vítima do erro médico, você ou alguém que você conhece?'
  },
  {
    type: 'form',
    fields: [
      {
        type: 'options',
        name: 'victim',
        options: ['Eu', 'Outra pessoa']
      },
    ]
  }  ,
  {
    type: 'sent',
    content: '{victim}.'
  },
  {
    type: 'received',
    content: 'Entendo. Foi um procedimento estético?'
  },
  {
    type: 'form',
    fields: [
      {
        type: 'options',
        name: 'procedure',
        options: ['Sim', 'Não']
      }
    ]
  },
  {
    type: 'sent',
    content: '{procedure}.'
  },
  {
    type: 'received',
    content: 'E você já procurou a opinião de um segundo profissional da saúde?'
  },
  {
    type: 'form',
    fields: [
      {
        type: 'options',
        name: 'second_opinion',
        options: ['Sim', 'Não']
      }
    ]
  },
  {
    type: 'sent',
    content: '{second_opinion}.'
  },
  {
    type: 'received',
    content: 'Certo! Obrigado pelas informações.'
  },
  {
    type: 'received',
    content: 'Como você se chama?'
  },
  {
    type: 'form',
    fields: [
      {
        type: 'text',
        name: 'name',
        placeholder: 'Nome'
      }
    ]
  },
  {
    type: 'sent',
    content: 'Meu nome é {name}.'
  },
  {
    type: 'received',
    content: 'Obrigado, {name}. Qual seu celular para que possamos manter contato?'
  },
  {
    type: 'form',
    fields: [
      {
        type: 'text',
        name: 'phone',
        placeholder: 'DDD + Celular'
      }
    ]
  },
  {
    type: 'sent',
    content: '{phone}'
  },
  {
    type: 'received',
    content: 'Obrigado! Gostaria de continuar a conversar por Whatsapp?'
  },
  {
    type: 'form',
    fields: [
      {
        type: 'options',
        name: 'whatsapp',
        options: ['Sim', 'Não']
      }
    ]
  },
  {
    type: 'redirect',
    url: 'http://api.whatsapp.com/send?phone=5511999668246'
  }
]

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      lastMessage: -1,
      formData: {},
      timeout: null
    }

    this.setFormData = this.setFormData.bind(this)
    this.sendQueuedMessages = this.sendQueuedMessages.bind(this)
    this.setLastMessage = this.setLastMessage.bind(this)
  }

  sendQueuedMessages() {
    const currentMessageIndex = this.state.lastMessage+1;
    const currentMessage = messageDB[currentMessageIndex];

    if(currentMessage) {
      const messages = [
        ...this.state.messages,
        currentMessage
      ];

      this.setState({messages, lastMessage: currentMessageIndex}) 
      window.scrollTo(0,document.body.scrollHeight);

      
      this.state.timeout = setTimeout(() => {
        if(currentMessage.type !== 'form') this.sendQueuedMessages()
      }, 1500)
    } 
  }

  setFormData(key, val) {
    let formData  = {
      ...this.state.formData,
      [key]: val
    }
    this.setState({formData});
  }

  componentDidMount() {
    this.sendQueuedMessages();
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  setLastMessage(lastMessage) {
    let { messages, timeout } = this.state;
    clearTimeout(timeout);
    messages = messages.slice(0,lastMessage+1);
    this.setState({lastMessage, messages});
  }

  render() {
    const { messages, lastMessage, formData } = this.state;

    return(
      <div className="chat">
        <span className="background"></span>
        <Nav />

        {messages.map((message, i) => {
            const avatar = !(messages[i-1] && messages[i-1].type === message.type);
            return(
              <div>
                <Message
                  key={i}
                  avatar={avatar}
                  formData={formData}
                  currentMessage={i}
                  lastMessage={lastMessage}
                  setFormData={this.setFormData}
                  setLastMessage={this.setLastMessage}
                  sendQueuedMessages={this.sendQueuedMessages}
                  {...message}
                >
                  {message.content}
                </Message>
                {i == lastMessage && message.type !== 'form' &&
                  <Message key={`typing${i}`} type='received'>
                    <img style={{width: '50px', margin: '-20px 0'}} src="/static/img/typing.gif" alt=""/>
                  </Message>
                }
              </div>  
            )
          }
        )}
      </div>
    )
  }
}

export default Chat