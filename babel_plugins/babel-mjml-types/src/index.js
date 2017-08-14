import find from 'lodash/find'
import each from 'lodash/each'
import { initializeType } from './types/type'

export default function ({ types: t }) {
  return {
    visitor: {
      Program(programPath) {
        programPath.traverse({
          ClassDeclaration(path) {
            const nodeWithMjType = find(
              path.node.body.body,
              e => e.type === 'ClassProperty' && e.key.name === 'mjTypes'
            )

            if (!nodeWithMjType) {
              return
            }

            console.log(`${path.node.id.name} has mjTypes !`)

            const types = nodeWithMjType.value.properties

            each(types, (type) => {
              console.log(initializeType(type.value.value))
            })
          },
        })
      },
    },
  }
}
