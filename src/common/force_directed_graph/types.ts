export interface GraphNode {
  label: string;
  id: number;
  group?: number;
  color?: number;
}

export interface GraphLink {
  source: number;
  target: number;
  value: number;
}

export interface NodeLinks {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface SimulationProps {
  data: { nodes: any[]; links: any[] };
  height: number;
  width: number;
  maxSteps: number;
  strength: number;
}
