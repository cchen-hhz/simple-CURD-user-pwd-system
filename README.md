# 极简 CURD 实现，账号密码存储登录

## 使用

```bash
npm install
node app.js
```

使用 `express` 和 `mongodb` 实现的简单 CURD ，支持添加，删除，验证登录，查询所有，删除操作。

数据库连接本地 `localhost:27017` ，服务器使用本地 `localhost:8080`。

数据库由 `database.js` 驱动，服务器由 `client.js` 驱动，是第一版的，写的很随意（

## Todo List

- 完善 CSS 。
- 更改架构（太丑了）。
- 把配置文件分离出来。