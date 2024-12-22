FROM php:8.3-fpm
ARG user
ARG uid

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    git \
    curl \
    zip \
    unzip \
    supervisor \
    default-mysql-client
  
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN useradd -u $uid -ms /bin/bash -g www-data $user

COPY . /var/www/html

COPY --chown=$user:www-data . /var/www/html

COPY /var/www/html/.env.example /var/www/html/.env

USER $user

EXPOSE 9000

CMD ["php-fpm"]