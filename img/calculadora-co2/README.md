# 🌍 Calculadora de CO₂

Um projeto interativo para calcular e acompanhar as emissões de dióxido de carbono (CO₂) com base nas viagens realizadas.

## 📋 Descrição

A **Calculadora de CO₂** permite que você:

- ✅ Registre viagens com distância e tipo de transporte
- 📊 Calcule automaticamente as emissões de CO₂ para cada viagem
- 📈 Visualize o total acumulado de emissões
- 💾 Armazene o histórico de viagens localmente no navegador
- 📥 Exporte os dados em formato CSV
- 🗑️ Remova viagens individuais ou todo o histórico
 - 🌓 Modo Claro/Escuro persistente
 - 📋 Copiar relatório (CSV) para área de transferência
 - 🔗 Compartilhar relatório via dispositivo (quando suportado)

## 🚗 Tipos de Transporte Suportados

| Transporte | Emissão | Descrição |
|-----------|---------|-----------|
| 🚗 Carro a Gasolina | 0.21 kg CO₂/km | Maior emissor |
| 🚗 Carro a Diesel | 0.19 kg CO₂/km | Segundo maior |
| ⚡ Carro Elétrico | 0.05 kg CO₂/km | Baixa emissão |
| 🏍️ Motocicleta | 0.08 kg CO₂/km | Reduzida |
| 🚌 Ônibus | 0.09 kg CO₂/km | Compartilhado |
| 🚂 Trem | 0.04 kg CO₂/km | Muito baixa |
| 🚴 Bicicleta | 0.00 kg CO₂/km | Zero emissão |
| 🚶 A Pé | 0.00 kg CO₂/km | Zero emissão |

## 🎯 Características Principais

### 1. **Interface Intuitiva**
- Design moderno e responsivo
- Funciona perfeitamente em desktop e mobile
- Gradiente visual atraente

### 2. **Estatísticas em Tempo Real**
- Total de viagens registradas
- Distância total percorrida
- CO₂ total emitido
- Média de emissão por viagem

### 3. **Histórico Detalhado**
- Lista completa de todas as viagens
- Informações: transporte, distância, data e emissão
- Ordenação por data (mais recentes primeiro)

### 4. **Armazenamento Local**
- Dados persistidos no `localStorage`
- Histórico mantido mesmo após fechar o navegador
- Sem necessidade de servidor

### 5. **Exportação de Dados**
- Gera arquivo CSV com relatório completo
- Inclui resumo geral e detalhes de cada viagem
- Facilita análise em ferramentas externas

## 🚀 Como Usar

### 1. **Abrir o Projeto**
   - Navegue até a pasta do projeto
   - Abra o arquivo `index.html` em seu navegador

### 2. **Adicionar uma Viagem**
   - Preencha a distância em quilômetros
   - Selecione o tipo de transporte
   - (Opcional) Adicione uma descrição
   - Clique no botão "Adicionar Viagem"

### 3. **Visualizar Estatísticas**
   - O painel de resumo atualiza automaticamente
   - Veja o total de viagens, distância e CO₂

### 4. **Gerenciar Viagens**
   - Visualize o histórico completo
   - Clique em "Remover" para deletar uma viagem específica
   - Use "Limpar Histórico" para remover todas

### 5. **Exportar Dados**
   - Clique em "Exportar Dados"
   - Um arquivo CSV será baixado automaticamente

## 📁 Estrutura do Projeto

```
calculadora-co2/
├── index.html      # Estrutura HTML e interface
├── styles.css      # Estilos CSS (responsive)
├── script.js       # Lógica JavaScript
└── README.md       # Este arquivo
```

## 💻 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Flexbox e Grid
- **JavaScript (Vanilla)**: Lógica sem dependências
- **localStorage**: Armazenamento persistente

## 🔧 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Nenhuma instalação ou servidor necessário

## 📊 Exemplos de Emissões

Veja quanto CO₂ você emite em diferentes cenários:

### Viagem de 100 km
- 🚗 Carro a Gasolina: **21 kg CO₂**
- 🚌 Ônibus: **9 kg CO₂**
- 🚂 Trem: **4 kg CO₂**
- ⚡ Carro Elétrico: **5 kg CO₂**

### Viagem de 500 km
- 🚗 Carro a Gasolina: **105 kg CO₂**
- 🚌 Ônibus: **45 kg CO₂**
- 🚂 Trem: **20 kg CO₂**

## 🌱 Dicas Sustentáveis

Para reduzir sua pegada de carbono:

1. **Prefira transporte público**: Ônibus e trens emitem menos por passageiro
2. **Considere bicicleta**: Para distâncias curtas, zero emissão
3. **Carpool**: Compartilhe viagens de carro com amigos
4. **Carro elétrico**: Se usar carro, prefira versão elétrica
5. **Combinações**: Misture transporte público com bicicleta

## 📱 Responsividade

A aplicação foi desenvolvida com **Mobile-First**:
- ✅ Otimizada para smartphones
- ✅ Tablet-friendly
- ✅ Desktop com layout completo

## 💾 Dados Persistentes

Seus dados são salvos automaticamente no navegador usando:
- `localStorage`: Armazena até 5-10MB (dependendo do navegador)
- Não requer servidor
- Dados não são sincronizados entre dispositivos

## 🎨 Personalização

Você pode personalizar:
- **Cores**: Modifique as variáveis CSS no `:root`
- **Fatores de emissão**: Ajuste valores no objeto `emissionFactors`
- **Nomes de transporte**: Customize em `transportNames`

Exemplo de mudança de cor:
```css
:root {
    --primary-color: #sua-cor-aqui;
}
```

## ⚠️ Observações

- Os fatores de emissão são baseados em dados médios e podem variar
- Carro compartilhado: divida a emissão pelo número de passageiros
- Dados são salvos apenas no navegador atual
- Limpar dados do navegador apagará o histórico

## 🤝 Contribuindo

Sugestões para melhorias:
- Adicionar mais tipos de transporte
- Integrar com APIs de clima
- Comparação entre períodos
- Gráficos e visualizações
- Modo offline progressivo

## 📄 Licença

Este projeto é de código aberto e pode ser utilizado livremente.

---

**Feito com ❤️ para um planeta mais verde** 🌍💚
