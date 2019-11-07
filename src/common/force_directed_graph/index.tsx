// https://github.com/uber/react-vis/blob/master/showcase/examples/force-directed-graph/force-directed-graph.js

import React, { useMemo } from "react";
import {
  LabelSeries,
  LineSeries,
  MarkSeries,
  CustomSVGSeries,
  XYPlot
} from "react-vis";
import "./index.scss";
import { NodeLinks, GraphNode } from "./types";
import { generateSimulation, mapLinkToArrowHead } from "./simulation";
import { ServiceID } from "../../types/service";

const colors = ["#4299E1", "#48BB78"];

interface ForceDirectedGraphProps {
  className?: string;
  data: NodeLinks;
  height: number;
  width: number;
  steps?: number;
  animation: boolean;
  onClickService: (serviceId: ServiceID) => any;
}
const margin = { left: 50, right: 50, top: 50, bottom: 50 };

function arrowHeadComponent(row: any, positionInPixels: any) {
  const { size, angle } = row;
  return (
    <g transform={`rotate(${angle})`}>
      <polygon
        fill="#B3AD9E"
        points={`0 0 -${size / 2} ${size} ${size / 2} 0 -${size /
          2} -${size} 0 0`}
      />
    </g>
  );
}

function ForceDirectedGraph(props: ForceDirectedGraphProps) {
  const { className = "", data, height, width, onClickService } = props;

  const simData = useMemo(() => {
    const { nodes, links } = generateSimulation({
      data,
      maxSteps: 50,
      height,
      width,
      strength: 0
    });
    const arrowHeads = links.map(mapLinkToArrowHead(20));
    return { nodes, links, arrowHeads };
  }, [data, height, width]);

  const { nodes, links, arrowHeads } = simData;
  return (
    <XYPlot width={width} height={height} margin={margin} className={className}>
      {links.map(({ source, target }, index) => {
        return (
          <LineSeries
            color={"#B3AD9E"}
            key={`link-${index}`}
            opacity={0.3}
            strokeWidth={4}
            data={[{ ...source, color: null }, { ...target, color: null }]}
          />
        );
      })}
      {arrowHeads.map((dataPoint, index) => {
        return (
          <CustomSVGSeries
            customComponent={arrowHeadComponent}
            key={dataPoint.key}
            data={[{ ...dataPoint, color: null, size: 10 }]}
          />
        );
      })}
      <MarkSeries
        data={nodes}
        colorType={"category"}
        stroke={"#ddd"}
        strokeWidth={8}
        size={30}
        colorRange={colors}
        onValueClick={(datapoint: GraphNode) => {
          onClickService(datapoint.id);
        }}
      />
      <LabelSeries
        allowOffsetToBeReversed
        className="avoid-clicks"
        data={nodes}
        labelAnchorX="middle"
        labelAnchorY="middle"
      />
    </XYPlot>
  );
}

export default ForceDirectedGraph;
