make:
	docker build -t registry.jorgeadolfo.com/epav-gui:1.1.0 -f docker/Dockerfile .

compose:
	docker-compose -f docker/docker-compose.yml up

composed:
	docker-compose -f docker/docker-compose.yml up -d
