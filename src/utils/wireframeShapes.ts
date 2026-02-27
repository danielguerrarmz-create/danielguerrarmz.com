/**
 * Wireframe shape definitions for slot navigation.
 * Each shape: vertices [x,y,z] in -1..1, edges [i,j].
 * Order: 0=icosahedron, 1=cube, 2=tetrahedron, 3=octahedron, 4=torus, 5=cylinder, 6=triangular prism.
 */

export interface WireframeShape {
  vertices: [number, number, number][];
  edges: [number, number][];
}

const phi = (1 + Math.sqrt(5)) / 2;

export const WIREFRAME_SHAPES: WireframeShape[] = [
  // 0 - Icosahedron
  {
    vertices: [
      [0, 1, phi],
      [0, -1, phi],
      [0, 1, -phi],
      [0, -1, -phi],
      [1, phi, 0],
      [-1, phi, 0],
      [1, -phi, 0],
      [-1, -phi, 0],
      [phi, 0, 1],
      [-phi, 0, 1],
      [phi, 0, -1],
      [-phi, 0, -1],
    ].map(([a, b, c]) => [(a as number) / phi, (b as number) / phi, (c as number) / phi] as [number, number, number]),
    edges: [
      [0, 1], [0, 4], [0, 5], [0, 8], [0, 9],
      [1, 6], [1, 7], [1, 8], [1, 9],
      [2, 3], [2, 4], [2, 5], [2, 10], [2, 11],
      [3, 6], [3, 7], [3, 10], [3, 11],
      [4, 5], [4, 8], [4, 10],
      [5, 9], [5, 11],
      [6, 7], [6, 8], [6, 10],
      [7, 9], [7, 11],
      [8, 10],
      [9, 11],
    ],
  },
  // 1 - Cube
  {
    vertices: [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]],
  },
  // 2 - Tetrahedron
  {
    vertices: [[0, 1, 0.8], [-0.9, -0.8, 0.5], [0.9, -0.8, 0.5], [0, -0.2, -0.9]],
    edges: [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]],
  },
  // 3 - Octahedron
  {
    vertices: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]],
    edges: [[0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]],
  },
  // 4 - Torus (approximated: two rings of vertices)
  {
    vertices: (() => {
      const R = 0.7,
        r = 0.3;
      const out: [number, number, number][] = [];
      for (let i = 0; i < 8; i++) {
        const t = (i / 8) * Math.PI * 2;
        for (let j = 0; j < 6; j++) {
          const p = (j / 6) * Math.PI * 2;
          out.push([
            (R + r * Math.cos(p)) * Math.cos(t),
            r * Math.sin(p),
            (R + r * Math.cos(p)) * Math.sin(t),
          ]);
        }
      }
      return out;
    })(),
    edges: (() => {
      const e: [number, number][] = [];
      const rings = 8;
      const perRing = 6;
      const n = rings * perRing;
      for (let i = 0; i < n; i++) {
        const nextInRing = i % perRing === perRing - 1 ? i - (perRing - 1) : i + 1;
        const nextRing = (i + perRing) % n;
        e.push([i, nextInRing]);
        e.push([i, nextRing]);
      }
      return e;
    })(),
  },
  // 5 - Cylinder (two circles + vertical edges)
  {
    vertices: (() => {
      const out: [number, number, number][] = [];
      const n = 12;
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2;
        out.push([Math.cos(t), 1, Math.sin(t)]);
        out.push([Math.cos(t), -1, Math.sin(t)]);
      }
      return out;
    })(),
    edges: (() => {
      const e: [number, number][] = [];
      const n = 12;
      for (let i = 0; i < n; i++) {
        e.push([i * 2, i * 2 + 1]);
        e.push([i * 2, ((i + 1) % n) * 2]);
        e.push([i * 2 + 1, ((i + 1) % n) * 2 + 1]);
      }
      return e;
    })(),
  },
  // 6 - Triangular prism
  {
    vertices: [
      [0, 0.9, 0.6],
      [-0.8, -0.7, 0.6],
      [0.8, -0.7, 0.6],
      [0, 0.9, -0.6],
      [-0.8, -0.7, -0.6],
      [0.8, -0.7, -0.6],
    ],
    edges: [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 3], [0, 3], [1, 4], [2, 5]],
  },
];

/** Rotate [x,y,z] around Y by angle (radians), then orthographic project to 2D (x,z -> screen). */
export function projectVertex(
  v: [number, number, number],
  angleY: number
): { x: number; y: number; z: number } {
  const [x, y, z] = v;
  const cos = Math.cos(angleY);
  const sin = Math.sin(angleY);
  const x2 = x * cos - z * sin;
  const z2 = x * sin + z * cos;
  return { x: x2, y: -y, z: z2 };
}

/** Project shape with rotation; return 2D points and Z for depth. */
export function projectShape(
  shape: WireframeShape,
  angleY: number,
  size: number,
  cx: number,
  cy: number
): { points: { x: number; y: number; z: number }[]; edges: { i: number; j: number; midZ: number }[] } {
  const points = shape.vertices.map((v) => projectVertex(v, angleY));
  const edges = shape.edges.map(([i, j]) => {
    const a = points[i];
    const b = points[j];
    const midZ = (a.z + b.z) / 2;
    return { i, j, midZ };
  });
  edges.sort((a, b) => a.midZ - b.midZ);
  return { points, edges };
}
