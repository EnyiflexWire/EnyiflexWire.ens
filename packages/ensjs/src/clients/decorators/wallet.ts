import { type Account, type Transport, type WalletClient } from 'viem'
import { type ChainWithEns } from '../../contracts/consts'
import commitName, {
  type CommitNameParameters,
  type CommitNameReturnType,
} from '../../functions/write/commitName'
import createSubname, {
  type CreateSubnameParameters,
  type CreateSubnameReturnType,
} from '../../functions/write/createSubname'
import deleteSubname, {
  type DeleteSubnameParameters,
  type DeleteSubnameReturnType,
} from '../../functions/write/deleteSubname'
import registerName, {
  type RegisterNameParameters,
  type RegisterNameReturnType,
} from '../../functions/write/registerName'
import renewNames, {
  type RenewNamesParameters,
  type RenewNamesReturnType,
} from '../../functions/write/renewNames'
import setAbiRecord, {
  type SetAbiRecordParameters,
  type SetAbiRecordReturnType,
} from '../../functions/write/setAbiRecord'
import setAddressRecord, {
  type SetAddressRecordParameters,
  type SetAddressRecordReturnType,
} from '../../functions/write/setAddressRecord'
import setChildFuses, {
  type SetChildFusesParameters,
  type SetChildFusesReturnType,
} from '../../functions/write/setChildFuses'
import setContentHashRecord, {
  type SetContentHashRecordParameters,
  type SetContentHashRecordReturnType,
} from '../../functions/write/setContentHashRecord'
import setFuses, {
  type SetFusesParameters,
  type SetFusesReturnType,
} from '../../functions/write/setFuses'
import setPrimaryName, {
  type SetPrimaryNameParameters,
  type SetPrimaryNameReturnType,
} from '../../functions/write/setPrimaryName'
import setRecords, {
  type SetRecordsParameters,
  type SetRecordsReturnType,
} from '../../functions/write/setRecords'
import setResolver, {
  type SetResolverParameters,
  type SetResolverReturnType,
} from '../../functions/write/setResolver'
import setTextRecord, {
  type SetTextRecordParameters,
  type SetTextRecordReturnType,
} from '../../functions/write/setTextRecord'
import transferName, {
  type TransferNameParameters,
  type TransferNameReturnType,
} from '../../functions/write/transferName'
import unwrapName, {
  type UnwrapNameParameters,
  type UnwrapNameReturnType,
} from '../../functions/write/unwrapName'
import wrapName, {
  type WrapNameParameters,
  type WrapNameReturnType,
} from '../../functions/write/wrapName'

export type EnsWalletActions<
  TChain extends ChainWithEns,
  TAccount extends Account | undefined,
> = {
  /**
   * Commits a name to be registered
   * @param parameters - {@link CommitNameParameters}
   * @returns Transaction hash. {@link CommitNameReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions, randomSecret } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const secret = randomSecret()
   * const hash = await wallet.commitName({
   *   name: 'example.eth',
   *   owner: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
   *   duration: 31536000, // 1 year
   *   secret,
   * })
   * // 0x...
   */
  commitName: ({
    name,
    owner,
    duration,
    secret,
    resolverAddress,
    records,
    reverseRecord,
    fuses,
    ...txArgs
  }: CommitNameParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<CommitNameReturnType>
  /**
   * Creates a subname
   * @param parameters - {@link CreateSubnameParameters}
   * @returns Transaction hash. {@link CreateSubnameReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const hash = await wallet.createSubname({
   *   name: 'sub.ens.eth',
   *   owner: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
   *   contract: 'registry',
   * })
   * // 0x...
   */
  createSubname: ({
    name,
    contract,
    owner,
    resolverAddress,
    expiry,
    fuses,
    ...txArgs
  }: CreateSubnameParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<CreateSubnameReturnType>
  /**
   * Deletes a subname
   * @param parameters - {@link DeleteSubnameParameters}
   * @returns Transaction hash. {@link DeleteSubnameReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const hash = await wallet.deleteSubname({
   *   name: 'sub.ens.eth',
   *   contract: 'registry',
   * })
   * // 0x...
   */
  deleteSubname: ({
    name,
    contract,
    asOwner,
    ...txArgs
  }: DeleteSubnameParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<DeleteSubnameReturnType>
  /**
   * Registers a name on ENS
   * @param parameters - {@link RegisterNameParameters}
   * @returns Transaction hash. {@link RegisterNameReturnType}
   *
   * @example
   * import { createPublicClient, createWalletClient, http, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensPublicActions, ensWalletActions, randomSecret } from '@ensdomains/ensjs'
   *
   * const mainnetWithEns = addEnsContracts(mainnet)
   * const client = createPublicClient({
   *   chain: mainnetWithEns,
   *   transport: http(),
   * }).extend(ensPublicActions)
   * const wallet = createWalletClient({
   *   chain: mainnetWithEns,
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const secret = randomSecret()
   * const params = {
   *   name: 'example.eth',
   *   owner: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
   *   duration: 31536000, // 1 year
   *   secret,
   * }
   *
   * const commitmentHash = await wallet.commitName(params)
   * await client.waitForTransactionReceipt({ hash: commitmentHash }) // wait for commitment to finalise
   * await new Promise((resolve) => setTimeout(resolve, 60 * 1_000)) // wait for commitment to be valid
   *
   * const { base, premium } = await client.getPrice({ nameOrNames: params.name, duration: params.duration })
   * const value = (base + premium) * 110n / 100n // add 10% to the price for buffer
   * const hash = await wallet.registerName({ ...params, value })
   * // 0x...
   */
  registerName: ({
    name,
    owner,
    duration,
    secret,
    resolverAddress,
    records,
    reverseRecord,
    fuses,
    value,
    ...txArgs
  }: RegisterNameParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<RegisterNameReturnType>
  /**
   * Renews a name or names for a specified duration.
   * @param parameters - {@link RenewNamesParameters}
   * @returns Transaction hash. {@link RenewNamesReturnType}
   *
   * @example
   * import { createPublicClient, createWalletClient, http, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensPublicActions, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const mainnetWithEns = addEnsContracts(mainnet)
   * const client = createPublicClient({
   *   chain: mainnetWithEns,
   *   transport: http(),
   * }).extend(ensPublicActions)
   * const wallet = createWalletClient({
   *   chain: mainnetWithEns,
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   *
   * const duration = 31536000 // 1 year
   * const { base, premium } = await client.getPrice({
   *  nameOrNames: 'example.eth',
   *  duration,
   * })
   * const value = (base + premium) * 110n / 100n // add 10% to the price for buffer
   * const hash = await wallet.renewNames({
   *   nameOrNames: 'example.eth',
   *   duration,
   *   value,
   * })
   * // 0x...
   */
  renewNames: ({
    nameOrNames,
    duration,
    value,
    ...txArgs
  }: RenewNamesParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<RenewNamesReturnType>
  /**
   * Sets the ABI for a name on a resolver.
   * @param parameters - {@link SetAbiRecordParameters}
   * @returns Transaction hash. {@link SetAbiRecordReturnType}
   *
   * @example
   * import abi from './abi.json'
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions, encodeAbi } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   *
   * const encodedAbi = await encodeAbi({ encodeAs: 'json', abi })
   * const hash = await wallet.setAbiRecord({
   *   name: 'ens.eth',
   *   encodedAbi,
   *   resolverAddress: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
   * })
   * // 0x...
   */
  setAbiRecord: ({
    name,
    encodedAbi,
    resolverAddress,
    ...txArgs
  }: SetAbiRecordParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<SetAbiRecordReturnType>
  /**
   * Sets an address record for a name on a resolver.
   * @param parameters - {@link SetAddressRecordParameters}
   * @returns Transaction hash. {@link SetAddressRecordReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const hash = await wallet.setAddressRecord({
   *   name: 'ens.eth',
   *   coin: 'ETH',
   *   value: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
   *   resolverAddress: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
   * })
   * // 0x...
   */
  setAddressRecord: ({
    name,
    coin,
    value,
    resolverAddress,
    ...txArgs
  }: SetAddressRecordParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<SetAddressRecordReturnType>
  /**
   * Sets the fuses for a name as the parent.
   * @param parameters - {@link SetChildFusesParameters}
   * @returns Transaction hash. {@link SetChildFusesReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const hash = await wallet.setChildFuses({
   *   name: 'sub.ens.eth',
   *   fuses: {
   *     parent: {
   *       named: ['PARENT_CANNOT_CONTROl'],
   *     },
   *   },
   * })
   * // 0x...
   */
  setChildFuses: ({
    name,
    fuses,
    expiry,
    ...txArgs
  }: SetChildFusesParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<SetChildFusesReturnType>
  /**
   * Sets the content hash record for a name on a resolver.
   * @param parameters - {@link SetContentHashRecordParameters}
   * @returns Transaction hash. {@link SetContentHashRecordReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const hash = await wallet.setContentHashRecord({
   *   name: 'ens.eth',
   *   value: 'ipns://k51qzi5uqu5djdczd6zw0grmo23j2vkj9uzvujencg15s5rlkq0ss4ivll8wqw',
   *   resolverAddress: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
   * })
   * // 0x...
   */
  setContentHashRecord: ({
    name,
    contentHash,
    resolverAddress,
    ...txArgs
  }: SetContentHashRecordParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<SetContentHashRecordReturnType>
  /**
   * Sets the fuses for a name.
   * @param parameters - {@link SetFusesParameters}
   * @returns Transaction hash. {@link SetFusesReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const hash = await wallet.setFuses({
   *   name: 'sub.ens.eth',
   *   fuses: {
   *     named: ['CANNOT_TRANSFER'],
   *   },
   * })
   * // 0x...
   */
  setFuses: ({
    name,
    fuses,
    ...txArgs
  }: SetFusesParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<SetFusesReturnType>
  /**
   * Sets a primary name for an address.
   * @param parameters - {@link SetPrimaryNameParameters}
   * @returns Transaction hash. {@link SetPrimaryNameReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const hash = await wallet.setPrimaryName({
   *   name: 'ens.eth',
   * })
   * // 0x...
   */
  setPrimaryName: ({
    name,
    address,
    resolverAddress,
    ...txArgs
  }: SetPrimaryNameParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<SetPrimaryNameReturnType>
  /**
   * Sets multiple records for a name on a resolver.
   * @param parameters - {@link SetRecordsParameters}
   * @returns Transaction hash. {@link SetRecordsReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const hash = await wallet.setRecords({
   *   name: 'ens.eth',
   *   coins: [
   *     {
   *       coin: 'ETH',
   *       value: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
   *     },
   *   ],
   *   texts: [{ key: 'foo', value: 'bar' }],
   *   resolverAddress: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
   * })
   * // 0x...
   */
  setRecords: ({
    name,
    resolverAddress,
    clearRecords,
    contentHash,
    texts,
    coins,
    abi,
    ...txArgs
  }: SetRecordsParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<SetRecordsReturnType>
  /**
   * Sets a resolver for a name.
   * @param parameters - {@link SetResolverParameters}
   * @returns Transaction hash. {@link SetResolverReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const hash = await wallet.setResolver({
   *   name: 'ens.eth',
   *   contract: 'registry',
   *   resolverAddress: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
   * })
   * // 0x...
   */
  setResolver: ({
    name,
    contract,
    resolverAddress,
    ...txArgs
  }: SetResolverParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<SetResolverReturnType>
  /**
   * Sets a text record for a name on a resolver.
   * @param parameters - {@link SetTextRecordParameters}
   * @returns Transaction hash. {@link SetTextRecordReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const hash = await wallet.setTextRecord({
   *   name: 'ens.eth',
   *   key: 'foo',
   *   value: 'bar',
   *   resolverAddress: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
   * })
   * // 0x...
   */
  setTextRecord: ({
    name,
    key,
    value,
    resolverAddress,
    ...txArgs
  }: SetTextRecordParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<SetTextRecordReturnType>
  /**
   * Transfers a name to a new owner.
   * @param parameters - {@link TransferNameParameters}
   * @returns Transaction hash. {@link TransferNameReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const hash = await wallet.transferName({
   *   name: 'ens.eth',
   *   newOwnerAddress: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
   *   contract: 'registry',
   * })
   * // 0x...
   */
  transferName: ({
    name,
    newOwnerAddress,
    contract,
    reclaim,
    asParent,
    ...txArgs
  }: TransferNameParameters<
    TChain,
    TAccount,
    TChain
  >) => Promise<TransferNameReturnType>
  /**
   * Unwraps a name.
   * @param parameters - {@link UnwrapNameParameters}
   * @returns Transaction hash. {@link UnwrapNameReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const hash = await wallet.unwrapName({
   *   name: 'example.eth',
   *   newOwnerAddress: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
   *   newRegistrantAddress: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
   * })
   * // 0x...
   */
  unwrapName: <TName extends string>({
    name,
    newOwnerAddress,
    newRegistrantAddress,
    ...txArgs
  }: UnwrapNameParameters<
    TName,
    TChain,
    TAccount,
    TChain
  >) => Promise<UnwrapNameReturnType>
  /**
   * Wraps a name.
   * @param parameters - {@link WrapNameParameters}
   * @returns Transaction hash. {@link WrapNameReturnType}
   *
   * @example
   * import { createWalletClient, custom } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
   *
   * const wallet = createWalletClient({
   *   chain: addEnsContracts(mainnet),
   *   transport: custom(window.ethereum),
   * }).extend(ensWalletActions)
   * const hash = await wallet.wrapName({
   *   name: 'ens.eth',
   *   newOwnerAddress: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
   * })
   * // 0x...
   */
  wrapName: <TName extends string>({
    name,
    newOwnerAddress,
    fuses,
    resolverAddress,
    ...txArgs
  }: WrapNameParameters<
    TName,
    TChain,
    TAccount,
    TChain
  >) => Promise<WrapNameReturnType>
}

/**
 * Extends the viem client with ENS wallet actions
 * @param client - The viem {@link WalletClient} object to add the ENS wallet actions to
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { addEnsContracts, ensWalletActions } from '@ensdomains/ensjs'
 *
 * const clientWithEns = createWalletClient({
 *   chain: addEnsContracts(mainnet),
 *   transport: custom(window.ethereum),
 * }).extend(ensWalletActions)
 */
export const ensWalletActions = <
  TTransport extends Transport = Transport,
  TChain extends ChainWithEns = ChainWithEns,
  TAccount extends Account | undefined = Account | undefined,
>(
  client: WalletClient<TTransport, TChain, TAccount>,
): EnsWalletActions<TChain, TAccount> => ({
  commitName: (parameters) => commitName(client, parameters),
  createSubname: (parameters) => createSubname(client, parameters),
  deleteSubname: (parameters) => deleteSubname(client, parameters),
  registerName: (parameters) => registerName(client, parameters),
  renewNames: (parameters) => renewNames(client, parameters),
  setAbiRecord: (parameters) => setAbiRecord(client, parameters),
  setAddressRecord: (parameters) => setAddressRecord(client, parameters),
  setChildFuses: (parameters) => setChildFuses(client, parameters),
  setContentHashRecord: (parameters) =>
    setContentHashRecord(client, parameters),
  setFuses: (parameters) => setFuses(client, parameters),
  setPrimaryName: (parameters) => setPrimaryName(client, parameters),
  setRecords: (parameters) => setRecords(client, parameters),
  setResolver: (parameters) => setResolver(client, parameters),
  setTextRecord: (parameters) => setTextRecord(client, parameters),
  transferName: (parameters) => transferName(client, parameters),
  unwrapName: (parameters) => unwrapName(client, parameters),
  wrapName: (parameters) => wrapName(client, parameters),
})