import { useMemo, useState } from "react";
import { useWindowSize } from "../../../common/utils/window_size";
import { useStoreState } from "../../../store/hooks";
import { ServiceID, ServiceType } from "../../../types/service";

export function useGetGraphSize(
  heightRatio: number = 0.8,
  widthRatio: number = 0.8
) {
  const { width, height } = useWindowSize();
  const graphWidth = Math.max(width * widthRatio, 300);
  const graphHeight = Math.max(height * heightRatio, 600);
  return { height: graphHeight, width: graphWidth };
}

export function useGetGraphData(selectedId: ServiceID | null) {
  const { byId, allIds } = useStoreState(state => state.services);
  const data = useMemo(() => {
    const nodes = allIds.map(svcId => {
      const { type } = byId[svcId];
      const isSelected = svcId === selectedId;
      return {
        label: `${svcId}`,
        id: svcId,
        ...getNodeStyles(type, isSelected)
      };
    });
    const links = allIds.flatMap(svcId => {
      return byId[svcId].dependsOn.map(depId => {
        return { source: svcId, target: depId, value: 1 };
      });
    });
    return { nodes, links };
  }, [byId, allIds, selectedId]);
  return data;
}

export function getNodeColor(type: ServiceType) {
  return type === "HTTP" ? "teal" : "blue";
}

function getNodeStyles(type: ServiceType, isSelected: boolean) {
  const color = type === "gRPC" ? 0 : 1;
  if (!isSelected) return { color };
  return { color, opacity: 0.5 };
}
