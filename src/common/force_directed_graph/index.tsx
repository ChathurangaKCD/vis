// https://github.com/uber/react-vis/blob/master/showcase/examples/force-directed-graph/force-directed-graph.js

import React, { useMemo } from "react";
//@ts-ignore
import { LabelSeries, LineSeries, MarkSeries, XYPlot } from "react-vis";
import "./index.scss";
import { NodeLinks, GraphNode } from "./types";
import { generateSimulation } from "./simulation";
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

function ForceDirectedGraph(props: ForceDirectedGraphProps) {
  const {
    className = "",
    data,
    height,
    width,
    animation,
    onClickService
  } = props;

  const simData = useMemo(
    () =>
      generateSimulation({ data, maxSteps: 50, height, width, strength: 0 }),
    [data, height, width]
  );

  const { nodes, links } = simData;
  return (
    <XYPlot width={width} height={height} margin={margin} className={className}>
      {links.map(({ source, target }, index) => {
        return (
          <LineSeries
            animation={animation}
            color={"#B3AD9E"}
            key={`link-${index}`}
            opacity={0.3}
            data={[{ ...source, color: null }, { ...target, color: null }]}
          />
        );
      })}

      <MarkSeries
        data={nodes}
        animation={animation}
        colorType={"category"}
        stroke={"#ddd"}
        strokeWidth={2}
        size={30}
        colorRange={colors}
        onValueClick={(datapoint: GraphNode) => {
          onClickService(datapoint.id);
        }}
      />
      <LabelSeries
        animation
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
