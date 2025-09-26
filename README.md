##tasks

1. install postgreSQL
2. create a db named mahan-resume
   2/5. create a .env file (dotenv package)
3. install prisma
   3/5. connect prisma to db via connection string inside .env file
4. create a table named info with columns: id, type, desc which id is primary key with autoincrement
5. create an enum table for type which connects to info table target column type
6. inject the prisma object to res.Locals via useDbMiddleware
7. create a crud module for table info routes
   HINT: create -> post
   read -> get
   update -> put
   delete -> delete

<!--  -->

1. crud user table
2. create a user with admin role in pgAdmin with query tool
3. create a middleware on users for check role of requester
4. create a login page which accepts username and password
5. set the cookie with the key name of AUTH which the values is user id

NOTE: inside the number 3, we get the user ID from the cookie which we set 4 and 5, then we select user ID from the User table and checking the role. if the user (requestor) was admin, we allow him to continue the request otherwise we reject the request with status 403 (Forbidden)

6. only admin can create a info, only users can read info, only admin and editor role can delete or update info
