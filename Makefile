REGISTRY='registry.jorgeadolfo.com'
IMAGE='epav-api'
PORT=5000
VERSION=`jq -r '.version' package.json`
NAME=$(IMAGE)
FULLNAME=$(REGISTRY)/$(IMAGE):$(VERSION)

make:
	docker build -t $(FULLNAME) -f docker/Dockerfile .

compose:
	docker-compose -f docker/docker-compose.yml up

composed:
	docker-compose -f docker/docker-compose.yml up -d
