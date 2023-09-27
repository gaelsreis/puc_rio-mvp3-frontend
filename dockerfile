# Use uma imagem base com o servidor web Nginx
#FROM nginx:latest
FROM nginx

# Copia os arquivos da aplicação para o diretório padrão do servidor web do Nginx
COPY . /usr/share/nginx/html

# O Nginx expõe a porta 80 por padrão, onde o servidor web irá rodar
EXPOSE 80

# Define o comando para iniciar o servidor web Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]