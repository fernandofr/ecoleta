## Sobre

O <strong>Ecoleta</strong> é uma aplicação Web e Mobile para ajudar pessoas a encontrarem pontos de coleta para reciclagem.


Essa aplicação foi construída a <strong>Next Level Week</strong> distribuída pela [Rocketseat](https://rocketseat.com.br/). A ideia de criar uma aplicação voltada ao meio ambiente surgiu da coincidência da data do curso e a data da <strong>semana do meio ambiente</strong>

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias [TypeScript](https://www.typescriptlang.org/), 
[Node.js](https://nodejs.org/en/), [ReactJS](https://reactjs.org/), [React Native](https://reactnative.dev/).

<a id="como-usar"></a>

## Como usar

- ### **Pré-requisitos**

  - É **necessário** possuir o **[Node.js](https://nodejs.org/en/)** instalado na máquina
  - É **preciso** ter um gerenciador de pacotes seja o **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**.
  - Para o mobile, é **essencial** ter o **[Expo](https://expo.io/)** instalado de forma global na máquina

1. Clone o projeto utilizando o comando abaixo:

```sh
  $ git clone https://github.com/fernandofr/ecoleta
```

2. Executando a Aplicação:

- Rodando o Back End (servidor)

```
  $ cd server
  # Instale as dependências
  $ yarn 
  # Crie o banco de dados  
  $ yarn run knex:migrate
  $ yarn run knex:seed
  # Inicie a API
  $ yarn run dev

```

- Rodando a aplicação web (Front End)

```
  $ cd web
  # Instale as dependências
  $ yarn 
  # Inicie o Front
  $ yarn start

```

- Rodando a aplicação mobile (Mobile)

```
  # Inicie a aplicação 
  $ cd mobile
  # Instale as dependências
  $ yarn
  # Inicie o Mobile
  $ yarn start

```

## Telas do App

### Versão Mobile

<img src="https://res.cloudinary.com/dkknopjnz/image/upload/v1591451079/readme-logos/ecoleta/ecoleta-mobile_n32f9q.png" alt="Mobile Screenshot"  style="max-width:100%;">

### Versão Web

<img src="https://res.cloudinary.com/dkknopjnz/image/upload/v1591451065/readme-logos/ecoleta/ecoleta-web_cc4iua.png" alt="Web Screenshot"  style="max-width:100%;">



## Como contribuir

- Faça um Fork desse repositório,
- Crie uma branch com a sua feature: `git checkout -b my-feature`
- Commit suas mudanças: `git commit -m 'feat: My new feature'`
- Push a sua branch: `git push origin my-feature`

---

<h4 align="center">
    Feito com 💜 by <a href="https://www.linkedin.com/in/fernandorochaf/" target="_blank">Fernando Ferreira Rocha</a>
</h4>