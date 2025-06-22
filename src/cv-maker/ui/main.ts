import { bindMainPage } from './components/main-page';
import { makeAppContext } from './context';

async function main() {

  const context = await makeAppContext()

  const container = document.getElementById("root")

  if (!container) {
    console.warn("root div container")
    return
  }

  console.log('initialized')

  bindMainPage(context, container)

  const code = context.editor.model.model.setValue(
    JSON.stringify(context.store.exampleResume, null, 2)
  )

}

main()
