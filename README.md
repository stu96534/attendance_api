# 鈦坦出勤
以前後端分離方式打造出勤打卡功能，此為後端專案。
- 部屬網站為heroku
- 前端專案連結：https://github.com/stu96534/attendance_front

## 功能介紹
### 一般使用者
 - 有登入頁面，需登入才可使用功能
 - 一般使用者若輸入密碼錯誤達5次以上則上鎖
 - 使用者可以修改密碼
 - 打卡功能
 - 可按登出鍵登出
### 管理者
 - 一般使用者擁有的基本功能
 - 管理者若輸入密碼錯誤達5次以上則變為預設密碼
 - 觀看各個使用者出勤紀錄
 - 若使用者上鎖，可進行解鎖
 - 可新增一般使用者

## 安裝
1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/stu96534/attendance_api.git
```

2.cd 至本專案資料夾:

```
cd restaurant_list
```

3.下載套件:

```
npm install
```

4.連接MySQL資料庫並載入:

```
npx sequelize db:migrate
```

5.載入種子資料:

```
npx sequelize db:seed:all
```

5.啟動程式:

```
npm run dev
```
## 開發工具
### window 10
 - Visual Studio Code - 開發環境
 - Node.js 版本 16.15.0- 伺服器
 - express 版本 4.16.4- 開發框架
 - express-session 版本 1.17.1- 驗證機制
 - mysql2 版本 2.1.0 -資料庫
 - sequlize 版本 5.21.13
 - sequlize-cli 版本 6.2.0
 - passport 版本 0.4.0 - 使用者認證
 - passport-local 版本 1.0.0 - 本地策略
 - passport-jwt 版本 4.0.0 - jwt策略
 - jsonwebtoken 版本 8.5.1 - token
 - bcrypt 版本 2.4.3 - 雜湊演算法
 - dotenv 版本 16.0.3 
 - cors 版本 2.8.5 - 跨域請求
 
