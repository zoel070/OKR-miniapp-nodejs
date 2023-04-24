# OKR 目标管理系统

## Environment

- Node.js >= v10.16.3
- MySQL@5.7

## Global Developer Tools

- nodemon
- knex

```
sudo npm install knex nodemon -g 
```

> Not Necessary

## Feature

- MVCS Framework
- Wechat API
- MySQL ORM

## Quick Start

0. open mysql create database okr-v1

1. npm install

2. Touch .env and fill it

3. npm run migrate:latest

4. npm run start

5. npm run migrate:rollback:all

## Server Deploy

pm2 startOrRestart ecosystem.config.js
