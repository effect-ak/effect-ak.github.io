import React from 'react'
import { UsePlaygroundContext } from '../hooks';

export function CodeTab() {

  const context = UsePlaygroundContext()

  React.useEffect(() => {
    const editor = context.editor.bindEditor()
    console.log('editor layout')
    editor?.layout({ height: 500, width: 10})
    return () => {
      editor?.dispose()
    }
  }, [ context ]);

  return <div id="code-editor" className="border border-gray-400"></div>;
}