# 2022-summer-2-a

## jigインターン2022年夏チームA「スマホでオンラインで福井すごろく」

https://jigintern-2022-summer-2-a.deno.dev/

## How To Run

#### clone

```shell
git clone https://github.com/jigintern/2022-summer-2-a.git
```

#### フロントエンドの開発サーバ起動

```shell
echo VITE_HOST=localhost:8000 > frontend/.env
cd frontend
npm install
npm run dev
```

#### バックエンドの開発サーバ起動

```shell
cd backend
deno task start
```