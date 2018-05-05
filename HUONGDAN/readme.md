# Step 1: 
Setup Node JS https://nodejs.org/dist/latest-v6.x/
Sau đó quánh lịnh `node -v` và `npm -v` để kiểm tra 
- Với Win 7 vào đây để fix 
https://stackoverflow.com/questions/27344045/installing-node-js-and-npm-on-windows-10 

# Step 2 
Vào https://gulpjs.com/ để tham khảo GUlp 
- Setup bằng lệnh: `npm i gulp-cli gulp -g`

# Step 3 
Cài Bower: `npm i bower -g`


# Step 4 
Create a new project 
Quánh `npm init` => Điền thông tin 
Quánh `bower init` => Điền thông tin 

Vào https://pugjs.org/ 

# Step 5 
Tạo file gulpfile.js 
Cài gulp lại vào project  `npm i gulp -S`
Cài DEL `npm i del`
Cài gulp-sass `npm i gulp-sass -S` => https://www.npmjs.com/package/gulp-sass
Sau đó quánh lệnh `gulp chạy-sass` đê build 

Cài gulp-pug `npm i gulp-pug -S` => https://www.npmjs.com/package/gulp-pug
Sau đó quánh lệnh `gulp chạy-pug` đê build 

# Step 6 
Chỉ cần chạy `gulp` => Lỗi 

# Step 7 
Vào https://www.npmjs.com/package/run-sequence 
Cài: `npm install run-sequence -S`


# Step 0 
Cài vào máy mình 
1) Đánh lệnh `npm i`
2) Đánh lệnh `bower update`