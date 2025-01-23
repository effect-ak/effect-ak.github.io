build-tg:
	PROJECT=tg-bot-playground vite build

dev:
	PROJECT=tg-bot-playground vite

gen-openapi-ui:
	redocly build-docs --output=docs/telegram-bot-api/index.html
