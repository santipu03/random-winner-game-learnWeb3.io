const { network } = require("hardhat")
const { FEE, VRF_COORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constants")
const { verify } = require("../utils/verify")

const developmentChains = ["hardhat", "localhost"]

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args = [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE]
    const waitConfirmations = developmentChains.includes(network.name) ? 1 : 6

    const deployedContract = await deploy("RandomWinnerGame", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: waitConfirmations,
    })

    log("-----------------------")

    if (!developmentChains.includes(network.name)) {
        await verify(deployedContract.address, args)
    }
}
