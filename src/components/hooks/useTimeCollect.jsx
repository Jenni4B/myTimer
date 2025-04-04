import { TimeCollectContext } from "../../context/TimeCollectContext";
import { useContext } from "react";

export const useTimeCollect = () => {
    const context = useContext(TimeCollectContext)
    if (!context) {
      throw new Error("useTimeCollect must be used in a provider")
    } return context;
  
  };

