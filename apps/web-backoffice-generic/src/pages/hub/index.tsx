import withAuth from "core-library/core/utils/withAuth";
import React from "react";


interface Props { }

const HubOverview: React.FC<Props> = (props) => {
  return (
    <div>HUB OVERVIEW</div>
  )
}


export default withAuth(HubOverview);
