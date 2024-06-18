// import React from "react";
// import { Config } from "../models/Config";

// interface ConfigDisplayProps {
//   config: Config | null;
// }

// const ConfigDetails: React.FC<ConfigDisplayProps> = ({ config }) => {
//   if (config === null) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div onClick={() => console.log(config)}>
//       <h2>Config {config.id} Branch: {"config.branch.gitBranch"}</h2>
//       <p>Key: {config.notes}</p>
//       <p>Value: {config.gitHash}</p>
//       <p>Description: {config.createdAt}</p>
//     </div>
//   );
// };

// export default ConfigDetails;
