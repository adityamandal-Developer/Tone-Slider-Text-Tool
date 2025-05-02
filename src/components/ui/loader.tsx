import React from "react";
import { OrbitProgress } from "react-loading-indicators";
type Props = {
  size?: string;
  state?: boolean;
};

const Loader = ({ size = "5px", state = false }: Props) => {
  return (
    state && (
      <OrbitProgress
        dense
        color="primary"
        style={{ fontSize: size }}
        text=""
        textColor=""
      />
    )
  );
};

export default Loader;
