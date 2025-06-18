build-tg:
	vite build

dev:
	vite

gen-openapi-ui:
	redocly build-docs \
		../tg-bot-client/openapi/openapi.yaml \
		--output=docs/telegram-bot-api/index.html \
		--theme.openapi.hideRequestPayloadSample \
		--theme.openapi.sortTagsAlphabetically \
		--template tg-bot-api.hbs
