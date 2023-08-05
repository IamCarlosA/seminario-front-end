import React, { FC } from "react";
import "./styles.scss";
import {
  Skeleton,
  SkeletonVariant,
  useDevice
} from "@ecommerce-ozon/design_system";


// eslint-disable-next-line no-shadow
export enum VehicleCardPlaceHolderVariant {
  // eslint-disable-next-line no-unused-vars
  NORMAL,
  // eslint-disable-next-line no-unused-vars
  SMALL,
}

interface Props {
  variant?: VehicleCardPlaceHolderVariant;
}

const VehicleCardPlaceHolderNormal = () => {
  const { isDesktop } = useDevice();

  return (
    <div className="vehicle-card-placeholder-container dso_card p_md">
      <div className="row card-header">
        <Skeleton
          width={isDesktop ? 107 : 75}
          height={isDesktop ? 28 : 19}
          className="m_y_xs_mobile"
          variant={SkeletonVariant.ROUND}
        />
        <Skeleton
          width={isDesktop ? 107 : 84}
          height={isDesktop ? 28 : 19}
          variant={SkeletonVariant.ROUND}
        />
      </div>
      <div className="row flex_center m_t_lg">
        <Skeleton
          width={isDesktop ? 275 : 141.56}
          height={isDesktop ? 156 : 78.79}
          variant={SkeletonVariant.SQUARE}
        />
      </div>
      <div className="row flex_center m_t_lg">
        <Skeleton
          width={isDesktop ? 105 : 66}
          height={isDesktop ? 32 : 24}
          variant={SkeletonVariant.SQUARE}
        />
      </div>
      <div className="row flex_center m_t_lg">
        <Skeleton
          width={isDesktop ? 173 : 95}
          height={isDesktop ? 76 : 24}
          variant={SkeletonVariant.SQUARE}
        />
      </div>
      <div className="row flex_center m_t_lg">
        <Skeleton
          width={isDesktop ? 296 : 141.56}
          height={40}
          variant={SkeletonVariant.SQUARE}
          className="bg_primary_300"
        />
      </div>
    </div>
  );
};
const VehicleCardPlaceHolderSmall = () => (
  <div className="vehicle-card-placeholder-container-small">
    <div className="dso_card" />
    <div className="m_y_xs">
      <Skeleton width={90} height={20} styles={{ borderRadius: 8 }} />
    </div>
  </div>
);

const VehicleCardPlaceHolder: FC<Props> = ({
  variant = VehicleCardPlaceHolderVariant.NORMAL,
}) => (
  <div>
    {variant === VehicleCardPlaceHolderVariant.NORMAL ? (
      <VehicleCardPlaceHolderNormal />
    ) : (
      <VehicleCardPlaceHolderSmall />
    )}
  </div>
);

export default VehicleCardPlaceHolder;
