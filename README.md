
  <p align="center">Sistema de cadastro de Companias</p>

## Description

Este é o frontend da aplicação, desenvolvido em Angular, para consumo da API RESTful criada no backend. Ele permite login e cadastro de usuario e o gerenciamento de empresas com funcionalidades de cadastro, edição, exclusão e visualização.

## Funcionalidades

### Endpoints RESTful:
- Tela de login e cadastro de usuario.
- Página principal com a lista de empresas.
- Formulário para cadastro e edição de empresas.
- Integração com a API do backend.

## Testes
- Unitários: Cobrem os componentes, serviços e a lógica interna do projeto.

## Deployment (DOCKER)

Certifique-se de ter o Docker e o Docker Compose instalados.
No diretório do projeto, execute:
```bash
docker-compose up --build
```
Acesse a aplicação em http://localhost:4200.

## Deployment (LOCAL sem DOCKER)

Certifique-se de ter o Node.js e o npm instalados.
Instale as dependências e inicie o sistema:
```bash
npm install
ng serve
```
Acesse a aplicação em http://localhost:4200.

## Testes
### Testes unitários:
```bash
npm run test
```
