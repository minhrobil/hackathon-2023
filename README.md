# Hackathon bot 2023
## TEAM: Báo thủ nhà ATI
> Ranh giới giữa báo thủ và pháo thủ thật là mong manh

Đây là tài liệu hướng dẫn chạy source của bot,
Một số thành phần cần cài đặt.

- nvm: công cụ quản lý node version, follow https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/
```sh
sudo apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
```
- node 14: sau khi cài nvm, chạy lệnh 
```sh
nvm install 14
```
- nest-cli: client của framework nestjs, follow https://docs.nestjs.com/
```sh
npm i -g @nestjs/cli
```
- ✨   That's all✨       

## Tính năng

- Cung cấp 5 REST API phục vụ cho game engine gọi

## Cài đặt


Clone source code về và cài thư viện

```sh
npm install
```

Development...

```sh
npm run start:dev
```

Testing...

```sh
npm test
```

Kiểm tra server có hoạt động không...

```sh
GET: http://localhost:3000/ping => Server is active now!
```

