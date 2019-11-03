// https://github.com/uber/react-vis/blob/master/showcase/examples/force-directed-graph/force-directed-graph.js

import React, { useMemo } from "react";
//@ts-ignore
import { LabelSeries, LineSeries, MarkSeries, XYPlot } from "react-vis";
import "./index.scss";
import { NodeLinks } from "./types";
import { generateSimulation } from "./simulation";

const colors = [
  "#19CDD7",
  "#DDB27C",
  "#88572C",
  "#FF991F",
  "#F15C17",
  "#223F9A",
  "#DA70BF",
  "#4DC19C",
  "#12939A",
  "#B7885E",
  "#FFCB99",
  "#F89570",
  "#E79FD5",
  "#89DAC1"
];

interface ForceDirectedGraphProps {
  className?: string;
  data: NodeLinks;
  height: number;
  width: number;
  steps?: number;
  animation: boolean;
}
const margin = { left: 50, right: 50, top: 50, bottom: 50 };

function ForceDirectedGraph(props: ForceDirectedGraphProps) {
  const { className = "", data, height, width, animation } = props;

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
      />
      <LabelSeries
        animation
        allowOffsetToBeReversed
        data={nodes}
        labelAnchorX="middle"
        labelAnchorY="middle"
      />
    </XYPlot>
  );
}

export default ForceDirectedGraph;
