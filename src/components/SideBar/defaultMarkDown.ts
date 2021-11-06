const defaultVal = `# Title

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* link to the creator github profile [here](https://github.com/MohammedAl-Rowad)

## Syntax highlighting

\`\`\`js
const myFunc = (...args) => {
  alert(3)
  return {name: 'rowadz', age: 23}
}
\`\`\`

## Code to start with

\`\`\`py
from collections import Counter, defaultdict
from browser import alert

def soul(*args):
  alert('u can alert here')
  c = Counter(args)
  d = defaultdict(lambda: ['name01', 'name02'])
  print(c, d['names'])
  
soul('d', 'c', 'a', 'a', 'a', 'w', 'c')
\`\`\`
`

export default defaultVal
