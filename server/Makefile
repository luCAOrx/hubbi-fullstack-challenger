include .env

.PHONY: up
up:
	docker compose up -d

.PHONY: down
down:
	docker compose down --remove-orphans

.PHONY: start-server
start-server:
	docker compose start hubbi-server

.PHONY: start-database
start-database:
	docker compose start hubbi-database

.PHONY: restart-server
restart-server:
	docker compose restart hubbi-server

.PHONY: restart-database
restart-database:
	docker compose restart hubbi-database

.PHONY: logs-server
logs-server:
	docker compose logs -f hubbi-server

.PHONY: logs-database
logs-database:
	docker compose logs -f hubbi-database

.PHONY: stop-server
stop-server:
	docker compose stop hubbi-server

.PHONY: stop-database
stop-database:
	docker compose stop hubbi-database

.PHONY: test-unit
test-unit:
	docker compose exec -u node hubbi-server sh -c 'npm run test:unit'

.PHONY: test-e2e
test-e2e:
	docker compose exec -u node hubbi-server sh -c 'npm run test:e2e'

.PHONY: test-watch-e2e
test-watch-e2e:
	docker compose exec -u node hubbi-server sh -c 'npm run test:watch:e2e'

.PHONY: server-container-terminal
server-container-terminal:
	docker compose exec -u node hubbi-server sh
