export const start = jest.fn();
export const loadAbi = jest.fn();
export const deployJsonAbi = jest.fn();
const mock =
  jest.fn().mockImplementation(() => ({
    async name() {
      return `name`
    },
    async symbol() {
      return `symbol`
    },
    async totalSupply() {
      return `10`
    },
    async balanceOf(ofAddress: string) {
      return 10
    },
    start,
    loadAbi,
    deployJsonAbi,
    contractAddress: `0x1`,
  }))
export default mock;