FROM --platform=linux/x86_64 mysql

ENV MYSQL_DATABASE SpringDataBase

COPY ./create.sql /docker-entrypoint-initdb.d/
