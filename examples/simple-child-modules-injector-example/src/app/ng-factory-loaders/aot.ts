export function load(moduleName: string, factory: any) {
  return factory[moduleName + 'NgFactory'];
}
