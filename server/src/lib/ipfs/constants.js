import { config } from '../../../config'

export const IPFS_CONST = {
    api: `${config.AWS_HOST}:5001`,
    gateway: `${config.AWS_HOST}:8080`
}
