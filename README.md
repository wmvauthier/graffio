# Graffio - LinkC NE

Um sistema de Automação para estacionamento contendo vários módulos que se integram entre si, conversando através do protocolo TCP/IP e 
gerando uma rede de Cancelas Automáticas e equipamentos de rede, deixando o controle do estacionamento na palma da sua mão.

- Módulo Gráfico para o Sistema Gramatta
- Exibe Gráficos e Relatórios do Estacionamento

## Requisitos

1. [Módulo Gramatta](https://github.com/devlinkcne/gramatta.git)
2. NodeJS

## Instalação

### NodeJS

Abra um Terminal no Raspberry e rode os comandos abaixo para realizar a instalação do NodeJS:

```bash
wget https://nodejs.org/dist/v8.9.0/node-v8.9.0-linux-armv7l.tar.gz
```
```bash
tar -xzf node-v8.9.0-linux-armv6l.tar.gz
```
```bash
cd node-v8.9.0-linux-armv7l/
```
```bash
sudo cp -R * /usr/local/
```
```bash
node -v
```

### Sistema

Abra um Terminal no Raspberry e entre na pasta de instalação do NodeJS para clonar o projeto com o seguinte comando:

```git
git clone https://github.com/devlinkcne/graffio.git
```

Entre na pasta de instalação do módulo Graffio e siga o diretório abaixo:

```bash
app/public/js/system/serverConfig.js
```

Altere a variável IP_DO_SERVIDOR pelo endereço IP do seu Módulo Gramatta:

```bash
IP_DO_SERVIDOR = '192.168.0.148';
```

### Testes

Para testar o funcionamento do módulo Graffio, basta realizar uma requisição via para a URL abaixo:

```bash
localhost:4000
```
