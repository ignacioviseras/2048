
build:
	docker build -t globant-2048 .

stop:
	docker rm -f nginx

up:
	docker-compose up --build -d

down:
	docker-compose down

re:
	docker-compose down
	docker-compose up --build -d

logs:
	docker-compose logs -f

.PHONY: build run stop up down re