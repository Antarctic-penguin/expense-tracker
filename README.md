## About - 介紹
這是一個記帳網站。 使用者可以註冊帳號、登入、新增、編輯或刪除屬於自己的記帳紀錄。

## Features - 功能

1. 註冊帳號，登入，登出
2. 新增支出資訊
3. 編輯支出資訊
4. 刪除支出資訊
5. 瀏覽專屬自己的支出清單
6.可以依分類排序支出清單


## Installation and execution - 安裝與執行步驟

1.Clone此專案至本機:
```
git clone https://github.com/Antarctic-penguin/expense-tracker.git
```

2.進入專案資料夾，安裝 npm 套件
```
npm install
```

3.安裝 nodemon 
```
npm install nodemon
```

4.設置 .env 檔
新增一個`.env` 檔案，設置`.env.example`中說明的所需資料

5.製作種子資料
```
npm run seed
```

6.啟動伺服器
```
npm run dev 
```

7.伺服器連線成功後即可使用