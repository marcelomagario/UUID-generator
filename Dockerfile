# Use uma imagem base com Node.js
FROM node:18

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos de configuração
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Expor a porta que o app vai usar
EXPOSE 3001

# Comando para rodar o app
CMD ["npm", "start"]
