build:
	PROJECT=tg-bot-playground vite build
	PROJECT=cv-maker vite build

dev-tg:
	PROJECT=tg-bot-playground vite

dev-cv:
	PROJECT=cv-maker vite

gen-openapi-ui:
	redocly build-docs --output=docs/telegram-bot-api/index.html
