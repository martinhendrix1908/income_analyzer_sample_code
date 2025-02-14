<script lang="ts">
  import { writable } from "svelte/store";
  import dagre from "@dagrejs/dagre";
  import {
    SvelteFlow,
    Position,
    ConnectionLineType,
    type Node,
    type Edge,
    SvelteFlowProvider,
  } from "@xyflow/svelte";
  import "@xyflow/svelte/dist/style.css";
  import CustomNode from "$lib/components/svelte-flow/CustomNode.svelte";
  import { page } from "$app/state";
  import type { GroupUnit } from "$lib/types/types";
  import CenterNodes from "$lib/components/svelte-flow/CenterNodes.svelte";

  const nodeTypes = {
    CustomNode: CustomNode,
  };

  export const getOrganizationUnitNodes = (groupUnitList: GroupUnit[]) => {
    const position = { x: 0, y: 0 };
    let nodes: any[] = [];
    let edges: any[] = [];

    function traverseOrgUnits(
      units: GroupUnit[],
      parentId: string | null = null
    ) {
      units.forEach((unit) => {
        // Create a node
        nodes.push({
          id: `${unit.id}`,
          type: "CustomNode",
          data: { label: unit.name, orgUnitType: unit.type },
          position,
        });

        // If there's a parent, create an edge
        if (parentId) {
          edges.push({
            id: `${parentId}-${unit.id}`,
            source: parentId,
            target: `${unit.id}`,
          });
        }

        // Recursively add child nodes
        if (unit.groupUnitList && unit.groupUnitList.length > 0) {
          traverseOrgUnits(unit.groupUnitList, `${unit.id}`);
        }
      });
    }

    traverseOrgUnits(groupUnitList);
    return { nodes, edges };
  };

  const nodeEdges = getOrganizationUnitNodes(page.data.organizationStructure);
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 172;
  const nodeHeight = 36;

  function getLayoutedElements(nodes: Node[], edges: Edge[]) {
    dagreGraph.setGraph({ rankdir: "TB", ranksep: 120 });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = Position.Top;
      node.sourcePosition = Position.Bottom;
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    });

    return { nodes, edges };
  }

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    nodeEdges.nodes,
    nodeEdges.edges
  );

  const nodes = writable<Node[]>(layoutedNodes);
  const edges = writable<Edge[]>(layoutedEdges);
</script>

<SvelteFlowProvider>
  <SvelteFlow
    {nodes}
    {edges}
    connectionLineType={ConnectionLineType.SmoothStep}
    defaultEdgeOptions={{ type: "smoothstep", animated: true }}
    {nodeTypes}
  >
    <CenterNodes />
  </SvelteFlow>
</SvelteFlowProvider>
