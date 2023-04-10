import {Button, Flex, Grid, Image, Text} from "theme-ui";
import {LoadingIcon} from "@/components/icons/LoadingIcon";
import {RefreshIcon} from "@/components/icons/RefreshIcon";
import useGemFarmStaking from "@/hooks/useGemFarmStaking";

export default function InfoStake({farmId}: { farmId: string }) {
  const {
    farmerAccount,
    farmerStatus,
    availableA,
    feedbackStatus,
    handleUnstakeButtonClick,
    handleClaimButtonClick,
    handleRefreshRewardsButtonClick,
  } = useGemFarmStaking(farmId)

  return <Grid sx={{width: '100%', mt: 30}}>
    <Flex
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text>
        NFTs staked:
      </Text>
      <Text>
        {farmerAccount?.gemsStaked.toNumber()}
      </Text>
    </Flex>

    <Flex
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text>
        Estimated Rewards:
      </Text>
      <Text>
        <b>
          {availableA ? (
            (availableA / 1000000000).toFixed(3)
          ) : (
            0
          )} $OSS
        </b>
      </Text>
    </Flex>

    <Button
      variant="primary"
      sx={{justifyContent: 'center'}}
      onClick={handleClaimButtonClick}
      disabled={!Number(availableA)}
    >
      Claim $OSS
    </Button>

    <Flex
      sx={{
        gap: "1.6rem",
        alignItems: "center",
      }}
    >
      <Button
        variant="secondary"
        sx={{flex: 1, justifyContent: 'center'}}
        onClick={handleUnstakeButtonClick}
        disabled={
          !(
            farmerStatus === "staked" ||
            farmerStatus === "pendingCooldown"
          )
        }
      >
        {farmerStatus === "pendingCooldown"
          ? "End cooldown"
          : "Unstake"}
      </Button>

      <Button
        variant="secondary"
        onClick={handleRefreshRewardsButtonClick}
        sx={{
          height: 42,
        }}
      >
        <RefreshIcon/>
      </Button>
    </Flex>
    <Flex
      sx={{
        alignItems: "center",
        gap: ".8rem",
        margin: ".8rem 0",
      }}
    >
      {feedbackStatus ? (
        <>
          <LoadingIcon size="1.6rem"/>
          {"  "} <Text>{feedbackStatus}</Text>
        </>
      ) : (
        ""
      )}
      &nbsp;
    </Flex>
  </Grid>
}
