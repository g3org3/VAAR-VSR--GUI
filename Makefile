REGISTRY='registry.jorgeadolfo.com'
IMAGE='epav-gui'
PORT=5000
VERSION='latest'
NAME=$(IMAGE)
FULLNAME=$(REGISTRY)/$(IMAGE):$(VERSION)

make:
	docker build -t $(FULLNAME) -f docker/Dockerfile .

compose:
	docker-compose -f docker/docker-compose.yml up

composed:
	docker-compose -f docker/docker-compose.yml up -d
