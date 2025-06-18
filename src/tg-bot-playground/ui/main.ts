import { makeContext } from './context';
import { bindPlayground } from './components/playground';

async function main() {

  const context = await makeContext()

  bindPlayground(context)

}

main()
