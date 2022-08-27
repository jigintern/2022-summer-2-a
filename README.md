# 2022-summer-2-a

jigインターン2022夏チームA「スマホでオンラインで福井すごろく」

## How to run

setup
```
cd frontend
npm i
cat << EOF > .env
VITE_HOST=localhost:8000
VITE_PROTOCOL=not_secure
EOF
```

run backend
```
cd backend
deno run -A main.ts
```
run frontend
```
cd frontend/dist
deno run --allow-net --allow-read https://taisukef.github.io/liveserver/liveserver.js
```
コンソールに表示されたURLを開く
