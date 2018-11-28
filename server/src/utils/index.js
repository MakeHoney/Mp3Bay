import { getContract } from './getContract'
import { getEventsFromBlock } from './getEventsFromBlock'
import Lib from '../lib'

const lib = new Lib()

export const utils = {
  getContract,
  getEventsFromBlock,
  lib
}
