const compareArr = <T, V>(arr1: T[], arr2: V[]) => {
  return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort())
}

const ErrorArgumentsMsg = [403, 'Invalid arguments']

export type ControllerReturnMsg = [number, string]

export const BodyChecker = (body: Record<string, string>) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let originalFunc: Function = descriptor.value
    descriptor.value = async function (...args: any[]) {
      const param = args[0]
      const need_verified_keys = Object.keys(body)
      const paramKeys = Object.keys(param)

      if (!compareArr(need_verified_keys, paramKeys)) {
        return ErrorArgumentsMsg
      }

      Object.entries(body).forEach(([key, value]) => {
        if (typeof param[key] !== value) {
          return ErrorArgumentsMsg
        }
      })

      return originalFunc.apply(this, args)
    }
  }
}
