/** @jsxImportSource theme-ui */
import {Flex, Text, Heading, Spinner, Button, Container, Alert} from "theme-ui"

import CollectionItem from "@/components/CollectionItem/CollectionItem"
import useGemFarmStaking from "hooks/useGemFarmStaking"
import {useWallet} from "@solana/wallet-adapter-react"

import Header from "@/components/Header/Header"
import {LoadingIcon} from "@/components/icons/LoadingIcon"
import InfoStake from "@/components/InfoStake/InfoStake";
import {InfoCircleFilled, WarningFilled} from "@ant-design/icons";

const farmId = process.env.NEXT_PUBLIC_GEMFARM_ID || "";

const StakePage = () => {
  const {
    farmerAccount,
    farmerVaultAccount,
    isLocked,
    farmerVaultNFTs,
    selectedVaultItems,
    handleMoveToWalletButtonClick,
    handleVaultItemClick,
  } = useGemFarmStaking(farmId)

  const {publicKey} = useWallet()

  return (
    <Container>
      <Header/>

      <Flex
        sx={{
          flexDirection: "column",
          marginTop: "8rem",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Heading sx={{fontSize: '4rem', fontFamily: 'go3v2'}}>Sensei Unstake</Heading>
        {!publicKey ? (
          /** Render nothing if there is no wallet connected. */
          <Text
            sx={{
              textAlign: "center",
              margin: "3.2rem 0",
            }}
          >
            Connect your wallet first.
          </Text>
        ) : !farmerAccount ? (
            <LoadingIcon
              size={"3.2rem"}
              sx={{
                margin: "3.2rem 0",
              }}
            />
          ) : /** If there is farmerAccount variable, but no address, it means account isn't initialized */
          farmerAccount && !farmerAccount?.identity ? (
            <Alert
              mb={2}
              variant='warning'
              sx={{
                margin: "3.2rem 0",
              }}
            >
              <WarningFilled sx={{mr: 1, color: 'warning'}}/>You not have a staking account.
            </Alert>
          ) : (
            <>
              {/** Render everything, since there is wallet and farmer account */}
              {/** Farmer account info section */}
              {farmerAccount?.identity ? (
                <InfoStake farmId={farmId}/>
              ) : null}
              {farmerVaultAccount ? (
                <>
                  {farmerVaultNFTs ? (
                      farmerVaultNFTs.length ? (
                        <Flex
                          sx={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignSelf: "stretch",
                            alignItems: "center",
                          }}
                        >
                          <div
                            sx={{
                              display: "grid",
                              gridTemplateColumns:
                                farmerVaultNFTs.length > 1 ? "1fr 1fr" : "1fr",
                              gap: "1.6rem",

                              "@media (min-width: 768px)": {
                                gridTemplateColumns:
                                  farmerVaultNFTs.length > 9
                                    ? "1fr 1fr 1fr 1fr 1fr 1fr 1fr"
                                    : farmerVaultNFTs.length > 4
                                      ? "1fr 1fr 1fr 1fr 1fr"
                                      : farmerVaultNFTs
                                        .map(() => "1fr")
                                        .join(" "),
                              },
                            }}
                          >
                            {farmerVaultNFTs.map((item) => {
                              const isSelected = selectedVaultItems.find(
                                (NFT) =>
                                  NFT.onchainMetadata.mint ===
                                  item.onchainMetadata.mint
                              )

                              return (
                                <CollectionItem
                                  key={item.onchainMetadata.mint}
                                  item={item}
                                  onClick={handleVaultItemClick}
                                  sx={{
                                    maxWidth: "16rem",
                                    "> img": {
                                      border: "3px solid transparent",
                                      borderColor: isSelected
                                        ? "primary"
                                        : "transparent",
                                    },
                                  }}
                                />
                              )
                            })}
                          </div>
                          <Alert
                            variant="info"
                            sx={{
                              margin: "3.2rem 0 .8rem 0",
                            }}
                          >
                            <InfoCircleFilled sx={{mr: 1, color: 'info'}}/>
                            {isLocked
                              ? "Unlock your vault to withdraw your NFTs."
                              : "Select NFTs to withdraw them to your wallet."}
                          </Alert>

                          {selectedVaultItems && selectedVaultItems.length ? (
                            <>
                              <Button
                                disabled={isLocked}
                                onClick={handleMoveToWalletButtonClick}
                              >
                                Withdraw selected
                              </Button>
                            </>
                          ) : null}
                        </Flex>
                      ) : (
                        /** vaultNFTs fetched but array is empty, means current wallet has no NFT. */
                        <Flex
                          sx={{
                            justifyContent: "center",
                            alignSelf: "stretch",
                          }}
                        >
                          <Text>There are no NFTs on your vault.</Text>
                        </Flex>
                      )
                    ) : /** No vaultNFTs and public key, means it is loading */
                    publicKey ? (
                      <Flex
                        sx={{
                          justifyContent: "center",
                          alignSelf: "stretch",
                        }}
                      >
                        <Spinner variant="styles.spinnerLarge"/>
                      </Flex>
                    ) : null}
                </>
              ) : null}
            </>
          )}
      </Flex>
    </Container>
  )
}

export default StakePage
