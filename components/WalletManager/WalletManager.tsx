/** @jsxImportSource theme-ui */
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui"
import {Flex} from "theme-ui"

const WalletManager = () => {
  return (
    <Flex
      sx={{
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",

        ".wallet-adapter-dropdown": {
          display: "flex",
          justifyContent: "center"
        }
      }}
    >
      <Flex
        sx={{
          justifyContent: "center"
        }}
      >
        <WalletMultiButton
          startIcon={null}
        />
      </Flex>
    </Flex>
  )
}

export default WalletManager
