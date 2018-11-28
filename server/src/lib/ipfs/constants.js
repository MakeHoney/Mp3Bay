import { config } from '../../config'

export const IPFS_CONST = {
  host: config.AWS_HOST.replace('http://', ''),
  api: `${config.AWS_HOST}:5001`,
  gateway: `${config.AWS_HOST}:8080`
}
