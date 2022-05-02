<div align="center">

![Express](https://img.shields.io/badge/-Express-000?&logo=Express&style=for-the-badge)
![Node.js](https://img.shields.io/badge/-Node.js-000?&logo=node.js&style=for-the-badge)
![GraphQl](https://img.shields.io/badge/-GraphQl-000?&logo=graphql&style=for-the-badge)

</div>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#goals">Goals</a> •
  <a href="#summary">Summary</a> •
  <a href="#improvements">Improvements</a> •
</p>

## Installation

<p>To quickly get this started and running locally, you will want to</p>

```shell
#Clone the repository locally via HTTPS/SSH/GithubCli
#SSH will look like the command below
git clone git@github.com:{github username here}/Structural-Project.git
```

```shell
#Install dependencies
npm install
```

```shell
#Start server
npm start

#After server is running you can run the test in a separate terminal window using
npm test

#You can type Ctrl+C to close a connection
```


## Goals

[✔️] API should support retrieving users and departments, either by id or as a total list

[✔️] API should support updating user information

[✔️] Given a user, it should be possible to explore relationships and their hierarchy

[✔️] Write test

[] Use Typescript


## Summary

<p>I want to start off by explaining my thought process of tackling the project and followed by what I had learned.</p>

#### Planning
<p>With a 2-4 hour time limit and not knowing Graphql or Typescript at all, I first went to YouTube and searched Graphql tutorial. I quickly learned that there are many different ways to use the query language on the back end and each video just seemed different. My first attempt had come to a conclusion after watching a web dev simplified video and referencing https://graphql.org/learn/ section. I had a rough version that could query data from the JSON provided and retrieve nested information. My curiosity to dive deeper made me realize my first approach just wasn't enough time to grasp what I had put together and I also didn't really understand the graphql syntax. I didn't write any test and I didn't use Typescript and felt I only scratched the surface.</p>

<p>My second approach had more of a plan since I allowed myself not to feel as rushed. I went through a part of the https://www.howtographql.com/ fundamental tutorial which gave me a better understanding of the core concepts. I decided I wanted to use Apollo as it goes over top of express and allows you to write graphql in template literals using the gql function. I also wanted to show I can do TDD so I wrote tests before implementing each Query, Mutation and Types. It took me a while to figure out how to test each endpoint but settled with Axios. Separating out the types and resolvers were simple enough and writing them was even easier.</p>

#### What I learned

<p>Writing each resolver is where I really started to understand the importance of types and how Apollo would produce an error if the value wasn't of the same type. Creating relationships with the data made me realize what I could be doing in the future at Structural if offered a position. I learned that one of the main benefits of graphql was eliminating sending the client data they don't need with more defined queries. It also was less code than I am used to for a typical rest API using express and Nodejs.</p>

#### Retrospec

<p>I realize that I still only scratched the surface. You can run typescript and nexus and have a graphql file generated automatically. There is intellisense support in Vscode that I would like to use in the future. It is used by pretty much any language. You can have subscriptions to connect messenger chats or maybe a counter that auto updates. You can setup variables to dynamically add data to arguments in a query or mutation. There is a lot and I am intrigued to learn more. I also plan to get into Typescript very soon but felt it may have been too much to tackle with a query language I have not used before.</p>

## Improvements

<p>Create a front end</p>
<p>Implement a database</p>
<p>Add a full name query</p>
<p>Add department employee counter query || orginazation counter query</p>

#### Big Picture

<p>If this was real data I could see expanding on the hierarchical data that explains who reports to who which could come in use for a workday application for example</p>
<p>I could see this data being used within a schedule system</p>
