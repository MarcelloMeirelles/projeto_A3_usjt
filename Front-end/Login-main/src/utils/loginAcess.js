import axios from "axios";

// Função para realizar a autenticação
async function autenticarLogin(email, senha) {
  try {
    const response = await axios.get("http://localhost:4000/bandas");
    const bandas = response.data;

    // Filtrar apenas o email e a senha das bandas
    const usuarios = bandas.map(({ email, senha }) => ({ email, senha }));

    // Verificar se o email e a senha correspondem a algum usuário
    const usuario = usuarios.find(
      (banda) => banda.email === email && banda.senha === senha
    );

    if (usuario) {
      // Autenticação bem-sucedida
      console.log("Usuário autenticado:", usuario);
      // Continue com a lógica desejada após a autenticação bem-sucedida
      alert(`Acesso liberado para ${email}`);
      navigate("./inicio"); // Redireciona para a página "/inicio" após o acesso ser liberado
    } else {
      // Autenticação falhou
      console.log("Autenticação falhou. Email ou senha incorretos.");
      // Continue com a lógica desejada após a falha na autenticação
      alert("Acesso negado. Faça o cadastro.");
    }
  } catch (error) {
    console.log("Erro ao obter os dados do microserviço 'bandas':", error);
    // Continue com a lógica desejada em caso de erro na obtenção dos dados
  }
}

autenticarLogin("seu-email@exemplo.com", "sua-senha-secreta");