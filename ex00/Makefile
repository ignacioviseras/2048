
build:
	docker build -t globant-2048 .

run:
	-docker rm -f nginx
	docker run -d --name nginx -p 5173:80 globant-2048

stop:
	docker rm -f nginx

.PHONY: build run stop