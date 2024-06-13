import { createControllerAction } from './create-controller-action'

export const controllerAction = {
  test: createControllerAction<string, string>('test'),
}
