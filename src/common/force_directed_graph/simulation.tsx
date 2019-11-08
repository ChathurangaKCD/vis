import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceCollide
} from "d3-force";
import { interpolateObject } from "d3-interpolate";
import { SimulationProps } from "./types";

/**
 * Create the list of nodes to render.
 * @returns {Array} Array of nodes.
 * @private
 */
export function generateSimulation(props: SimulationProps) {
  const { data, height, width, maxSteps, strength } = props;
  if (!data) {
    return { nodes: [], links: [] };
  }
  // copy the data
  const nodes = data.nodes.map(d => ({ ...d }));
  const links = data.links.map(d => ({ ...d }));
  // build the simuatation
  const simulation = forceSimulation(nodes)
    .force("link", forceLink().id((d: any) => d.id))
    .force("charge", forceManyBody().strength(strength))
    .force("center", forceCenter(width / 2, height / 2))
    .force("collision", forceCollide().radius(() => 50))
    .stop();

  (simulation.force("link") as any).links(links);

  const upperBound = Math.ceil(
    Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())
  );
  for (let i = 0; i < Math.min(maxSteps, upperBound); ++i) {
    simulation.tick();
  }
  return { nodes, links };
}

export function mapLinkToArrowHead(distanceFromNode: number) {
  return ({ source, target }: any) => {
    const { x: x1, y: y1, id: sourceId } = source;
    const { x: x2, y: y2, id: targetId } = target;
    const distance = getDistance(source, target);
    const step = distanceFromNode / distance;
    const i = interpolateObject({ x: x1, y: y1 }, { x: x2, y: y2 });
    const pos = i(step);
    const dirCorrection =
      (x1 > x2 && y1 > y2) || (x1 > x2 && y1 < y2) ? 180 : 0;
    const angle = (Math.atan(-(y2 - y1) / (x2 - x1)) * 180) / Math.PI;
    const key = `${sourceId}_${targetId}`;
    return { ...pos, key, angle: angle + dirCorrection };
  };
}

function getDistance(source: any, target: any) {
  const { x: x1, y: y1 } = source;
  const { x: x2, y: y2 } = target;
  return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
}
