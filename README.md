# Iniciar o MongoDB

Primeiro é necessário incluir a pasta bin do Mongo no Path para facilitar a execução dos comandos. No meu MAC a pasta do MongoDB está instalada em: "~/Documents/Treinamentos e Cursos/NodeJS - Coursera/MongoDB/mongodb-osx-x86_64-3.2.7/bin" por isso o comando é o seguinte:

`export PATH="~/Documents/Treinamentos e Cursos/NodeJS - Coursera/MongoDB/mongodb-osx-x86_64-3.2.7/bin":$PATH`

Na sequência, basta iniciar o Mongo indicando a pasta onde os dados serão armazenados:

`mongod --dbpath=database`