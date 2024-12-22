# Follow the below to run the project using docker compose

1. ``docker compose build``  

2. ``docker exec news_app cp .env.example .env``

3. ``docker exec news_app_backend cp .env.example .env``

4. Copy over the thirdparties news providers API detail that was shared via the email with Onat

5. ``docker exec news_app_backend composer install``

6. ``docker exec news_app_backend php artisan key:gen``

7. ``docker exec news_app_backend php artisan migrate --force``

8 ``docker exec news_app_backend php artisan news:scrape`` This command scrape news from the provider, the news will be updated subsquently using conjob

9. Finally, run ``docker compose up -d`` to start the container



## Screenshot of a working app

<img width="1731" alt="Screenshot 2024-12-22 at 9 35 29 PM" src="https://github.com/user-attachments/assets/766d0e0f-41e3-4cf5-a959-fbb1579098ff" />


<img width="1739" alt="Screenshot 2024-12-22 at 9 35 54 PM" src="https://github.com/user-attachments/assets/59cc5ae8-4928-4440-9d00-6757bacce6af" />


<img width="1743" alt="Screenshot 2024-12-22 at 9 36 13 PM" src="https://github.com/user-attachments/assets/a9624bd3-0ab4-4d7f-b5bf-6d10120176e4" />


<img width="1734" alt="Screenshot 2024-12-22 at 9 36 39 PM" src="https://github.com/user-attachments/assets/95bc58cd-5b5e-40d1-9235-83301640dee4" />

<img width="1734" alt="Screenshot 2024-12-22 at 9 36 55 PM" src="https://github.com/user-attachments/assets/e70a18a3-3cc6-4b91-b4c4-1592c4426eaf" />





