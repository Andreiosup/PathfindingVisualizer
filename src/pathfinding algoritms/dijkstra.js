export function dijkstra(grid,startNode,finishNode){ 

   const visitedNodesInOrder=[]
   startNode.distance=0
   const unVisitedNodes=getAllNodes(grid)
   
   

   while(!!unVisitedNodes.length){
       sortNodesByDistance(unVisitedNodes)
       const closestNode = unVisitedNodes.shift();
       if(closestNode.type==='wall')continue
       if (closestNode.distance === Infinity) return visitedNodesInOrder;
       closestNode.isVisited=true
       visitedNodesInOrder.push(closestNode);

       updateUnvisitedNeighbors(closestNode, grid);
       if(closestNode===finishNode)return visitedNodesInOrder
   }
}
function getAllNodes(grid){
    let nodes=[]
    for(const row of grid){
        for(const node of row){
            nodes.push(node)
        }
    }
    return nodes;
}
function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      if(neighbor.type==='weight'){
        neighbor.distance=node.distance+5
      }else{
        neighbor.distance=node.distance+1
      }
     
      neighbor.previousNode = node;
    }
  }
 
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}
function sortNodesByDistance(nodes){
    nodes.sort((nodeOne, nodeTwo) => nodeOne.distance - nodeTwo.distance);
}
export function getShortestDijkstraPath(finishNode) {
  
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      if(currentNode!==undefined){
        currentNode = currentNode.previousNode;
      }else{
        // console.log(nodesInShortestPathOrder)
        return nodesInShortestPathOrder;
      }
    }
}
