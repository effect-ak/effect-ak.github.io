build:
	PROJECT=tg-bot-playground vite build
	PROJECT=cv-maker vite build

dev-tg:
	PROJECT=tg-bot-playground vite

dev-cv:
	PROJECT=cv-maker vite

gen-openapi-ui:
	redocly build-docs \
		../tg-bot-client/openapi/openapi.yaml \
		--output=docs/telegram-bot-api/index.html \
		--theme.openapi.hideRequestPayloadSample \
		--theme.openapi.sortTagsAlphabetically \
		--template tg-bot-api.hbs
