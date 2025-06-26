## Passos para executar o projeto

Para executar localmente, será necessário ter instalado o [Docker](https://www.docker.com/) e o [Git](https://git-scm.com/).

Em seguida, executar os comandos abaixo.

```bash
git clone https://github.com/Edvan-Oliveira/user-management.git

cd user-management

docker compose up -d --build
```

Abra o navegador na URL http://localhost:85

### Parar a execução do projeto:
```bash
docker compose down
```
---

## Executar testes da api

Necessário subir o container do PostgreSQL para rodar o teste de integração:

```bash
docker compose -f .\docker-compose.test.yml up -d
```

Para parar o container do PostgreSQL após os testes:

```bash
docker compose -f .\docker-compose.test.yml down
```
