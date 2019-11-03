export interface Node {
  label: string;
  id: number;
  group?: number;
  color?: number;
}

export interface Link {
  source: number;
  target: number;
  value: number;
}

export interface NodeLinks {
  nodes: Node[];
  links: Link[];
}

export interface SimulationProps {
  data: { nodes: any[]; links: any[] };
  height: number;
  width: number;
  maxSteps: number;
  strength: number;
}
