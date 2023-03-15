## Ecomm 

Projeto de Ecommerce criando durante o programa LevelUp da Alura
________________________________

#### Tecnologias usadas:
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

#### Iniciando a aplicação:
- instalar os pacotes de dependência em cada serviço: 
```javascript 
npm install
```
- rodar cada serviço: 
```javascript 
npm start
```
________________________________
#### The Twelve-Factor App
Essa aplicação segue muitos dos fatores desta metodologia, segue abaixo um resumo de cada fator e como está sendo utilizado.

**I. Base de Código** :white_check_mark:
> Uma base de código com rastreamento utilizando controle de revisão, muitos deploys

O projeto tem o código versionado pelo Git e com repositório do código no GitHub.

**II. Dependências** :white_check_mark:
> Declare e isole as dependências

O projeto utiliza esse fator por meio do gerenciador de pacotes npm, garantindo a especificação e isolamento de dependências em cada serviço, podendo ser acessado através arquivos "package.json" e "package-lock.json".

**III. Configurações** :white_check_mark:
> Armazene as configurações no ambiente

O projeto utiliza, através da lib dotenv, os arquivos .env em cada serviço para fazer a configuração de algumas variavéis de ambiente, porém ainda restam alguns ajustes.

**IV. Serviços de Apoio** :white_check_mark:
> Trate os serviços de apoio, como recursos ligados

O projeto utiliza esse fator, uma vez que as conexões de serviço de apoio não devem ser feitas pelo próprio aplicativo, podendo alternar um banco de dados com uma URL simples. Isso é possível pois é usado a ORM mongoose.

**V. Construa, lance, execute** :white_check_mark:

> Separe estritamente os builds e execute em estágios

O projeto utiliza o Docker para garantir esse fator. O Docker abrange o build, release e execute da aplicação de forma consistente.

**VI. Processos** :white_check_mark:
> Execute a aplicação como um ou mais processos que não armazenam estado

O projeto utiliza este fator uma vez que a aplicação não armazena estados. Os dados necessários são salvos no banco de dados.

**VII. Vínculo de porta** :white_check_mark:
> Exporte serviços por ligação de porta

O projeto utiliza esse fator pois todas as portas estão vinculadas explicitamente e a comunicação entre os serviços é realizada por meio dele.

**VIII. Concorrência** :white_check_mark:
> Dimensione por um modelo de processo

O projeto utiliza esse fator pois segue o fator de processos e é um proejto possivelmente escalável.

**IX. Descartabilidade** :white_check_mark:
> Maximizar a robustez com inicialização e desligamento rápido

O projeto utiliza esse fator ao implementar a possibilidade de inicialização e desligamento rápido da aplicação, sendo que essa possibilidade ocorre por meio do uso do Docker.

**X. Dev/prod semelhantes** :white_check_mark:
> Mantenha o desenvolvimento, teste, produção o mais semelhante possível

O projeto utiliza esse fator, uma vez que é usado o mesmo ambiente para desenvolvimento e teste e encaixe do ambiente de produção.

**XI. Logs** :white_check_mark:
> Trate logs como fluxo de eventos

O projeto utiliza esse fator pois os logs são enviados para a saída padrão, o console.

**XII. Processos de Admin** :x:
> Executar tarefas de administração/gerenciamento como processos pontuais

Não utilizado nesse projeto
