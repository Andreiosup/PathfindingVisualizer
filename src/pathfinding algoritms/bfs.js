export function bfs(grid,startNode,finishNode){
    const structure = [];
    const visitedNodes = [];
    startNode.isVisited = true;
    structure.push(startNode);
  
    while (structure.length>0) {
    
      let currentNode = structure.shift()
    //   console.log(queue)
       visitedNodes.push(currentNode);
      if (currentNode === finishNode) {
        // console.log(visitedNodes)
        return visitedNodes;
      }
      // console.log(getNeighbors(currentNode,grid))
      for (let neighbor of getNeighbors(currentNode,grid) ){
        if (neighbor.type==='wall') {
          continue;
        }
       
        if(neighbor.isVisited===false){
          neighbor.isVisited = true;
          neighbor.previousNode = currentNode;
          structure.push(neighbor);
        }
        
      }
    }
    return visitedNodes
}

function getNeighbors(node,grid,name){
    const neighbors = [];
  const {col, row} = node;
 
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  

    
  return neighbors;
}
export function getShortestBFSPath(finishNode){
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
