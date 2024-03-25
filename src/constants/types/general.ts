export interface Position {
  x: number;
  y: number;
}

export interface Vertex {
  id: number;
  name: string;
  position: Position;
  color: string;
  edges: number[];
}
