import { bindRoot } from './components/main';
import { makeAppContext } from './context';

async function main() {

  const context = await makeAppContext()

  bindRoot(context)

}

main()
