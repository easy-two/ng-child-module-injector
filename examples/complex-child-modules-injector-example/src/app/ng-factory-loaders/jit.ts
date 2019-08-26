import { Compiler } from '@angular/core';

export function load(moduleName: string, factory: any, compiler: Compiler) {
  return compiler.compileModuleSync(factory[moduleName]);
}
