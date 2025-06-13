
import { makeContext } from './ui/context';
import { bindPlayground } from './ui/components/playground';

async function main() {

  const context = await makeContext()

  bindPlayground(context)

}

main()
