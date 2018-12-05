import { getContract } from './getContract'
import { event } from './getEventsFromBlock'
import Lib from '../lib'

const lib = new Lib()

export const utils = {
  getContract,
  event,
  lib
}
