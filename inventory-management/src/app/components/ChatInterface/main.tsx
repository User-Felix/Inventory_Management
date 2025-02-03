"use client";

import "./chat.css";
import { useState } from "react";
import { listarModelos, conversarComIA } from "../../lib/api";

const ChatInterface = () => {
  const [modeloSelecionado, setModeloSelecionado] = useState("gemini-1.5-flash-002");
  const [mensagem, setMensagem] = useState("");
  const [historico, setHistorico] = useState<Array<{ role: string; text: string }>>([]);
  const [mostrarModelos, setMostrarModelos] = useState(false);

  const handleConversar = async () => {
    if (!mensagem.trim()) return;

    // Adiciona a mensagem do usuário ao histórico
    const novoHistorico = [...historico, { role: "user", text: mensagem }];
    setHistorico(novoHistorico);

    // Limpa o campo de mensagem
    setMensagem("");

    // Chama a API para obter a resposta da IA
    const respostaIA = await conversarComIA(modeloSelecionado, novoHistorico);

    // Adiciona a resposta da IA ao histórico
    setHistorico([...novoHistorico, { role: "model", text: respostaIA }]);
  };

  const handleSelecionarModelo = async () => {
    const modelos = await listarModelos();
    console.log("Modelos suportados:", modelos);
    setMostrarModelos(!mostrarModelos);

    // Adiciona a classe ao elemento para controlar via CSS
    const modelsIa = document.getElementById("models-ia");
    if (modelsIa) {
      if (!mostrarModelos) {
        modelsIa.classList.add("mostrar");
      } else {
        modelsIa.classList.remove("mostrar");
      }
    }


  };

  return (
    <div id="content">
      <h1 id="text-title-banner">Interface de Conversação com IA</h1>
      <div id="models-ia">
        <button id="button" onClick={handleSelecionarModelo}>Escolher Modelo</button>
        {mostrarModelos && (
          <div id="modelos-menu">
            <h2>Modelos Suportados:</h2>
            <ul>
              {["gemini-1.5-flash-002", "gemini-1.5-pro-002"].map((modelo) => (
                <li key={modelo} onClick={() => setModeloSelecionado(modelo)}>
                  {modelo}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p>Modelo selecionado: {modeloSelecionado}</p>
      </div>
 
      <div id="chat-rolling">
        <h2>Histórico da Conversa:</h2>
        {historico.map((msg, index) => (
          <div id="message-ia" key={index} style={{ marginBottom: "10px" }}>
            <strong>{msg.role === "user" ? "Você:" : "IA:"}</strong>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

     <div id="talk-area">
        <input
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleConversar}>Enviar</button>
      </div>      
    </div>
  );
};

export default ChatInterface;