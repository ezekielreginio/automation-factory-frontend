FROM composer:2.5.1 as build
WORKDIR /app
COPY . /app
RUN apk add --update openssl zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install

RUN apk add --update npm
RUN npm install

RUN npm run production
CMD php artisan config:cache
CMD php artisan serve --host=0.0.0.0 --port=80
EXPOSE 80

ADD . /var/www

ADD ./public /var/www/html