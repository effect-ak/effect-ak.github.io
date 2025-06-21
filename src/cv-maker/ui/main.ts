import { bindPage } from './components/main';
import { makeAppContext } from './context';

async function main() {

  const context = await makeAppContext()

  const container = document.getElementById("root")

  if (!container) {
    console.warn("root div container")
    return
  }

  bindPage(context, container)

}

main()
