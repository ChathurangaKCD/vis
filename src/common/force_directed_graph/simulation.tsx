import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation
} from "d3-force";
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
