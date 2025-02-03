import { GoogleGenerativeAI } from "@google/generative-ai";

const CHAVE_DE_API = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
const genAI = new GoogleGenerativeAI(CHAVE_DE_API);

// Função para listar modelos suportados
export const listarModelos = async () => {
  const modelosSuportados = [
    "gemini-1.5-flash-002",
    "gemini-1.5-pro-002",
    // Adicione outros modelos suportados aqui
  ];

  return modelosSuportados;
};

// Função para conversar com a IA
export const conversarComIA = async (modelo: string, historico: Array<{ role: string; text: string }>) => {
  try {
    const model = genAI.getGenerativeModel({ model: modelo });

    // Formata o histórico para o formato esperado pela API
    const messages = historico.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({
      history: messages,
    });

    // Envia a última mensagem do usuário
    const result = await chat.sendMessage(historico[historico.length - 1].text);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    return "Erro ao gerar conteúdo.";
  }
};