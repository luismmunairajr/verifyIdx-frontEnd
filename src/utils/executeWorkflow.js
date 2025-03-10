import { evaluateCondition } from './evaluateCondition';

export const executeWorkflow = (nodes, edges, context) => {
  const startNode = nodes.find(node => node.type === 'start');
  let currentNode = startNode;

  while (currentNode) {
    if (currentNode.type === 'condition') {
      const conditionResult = evaluateCondition(currentNode.data.condition, context);
      const nextEdge = edges.find(edge => 
        edge.source === currentNode.id && 
        edge.sourceHandle === (conditionResult ? 'true' : 'false')
      );
      currentNode = nodes.find(node => node.id === nextEdge.target);
    } else {
      // Executar lógica do nó atual
      console.log(`Executing node: ${currentNode.data.title}`);
      const nextEdge = edges.find(edge => edge.source === currentNode.id);
      currentNode = nodes.find(node => node.id === nextEdge?.target);
    }
  }
};