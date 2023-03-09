export function astar(grid,startNode,finishNode){

  const visitedNodesInOrder=[]
  //gScore is the distance from a node to the startnode
  startNode.gScore=0
  //hScore is the distance from a node to the finish node
  startNode.hScore=getManhattanDistance(startNode,finishNode)

  const openSet=[]
  openSet.push(startNode)
  

  while(openSet.length > 0){
    
    sortNodesByFscore(openSet)
    
    var currentNode=openSet.shift()
    // console.log(openSet)
    console.log(currentNode)
    visitedNodesInOrder.push(currentNode)

    if(currentNode===finishNode)return visitedNodesInOrder
    
      // openSet.splice(lowestFScore,1)
    
    
    currentNode.closed=true
    for(let neighbor of getNeighbors(currentNode,grid)){
      // console.log(neighbor.closed)

      if(neighbor.type==='wall')continue
      if(neighbor.closed)continue

      let tentativeGscoreToNeighbor
      if(neighbor.type==='weight'){
        tentativeGscoreToNeighbor=currentNode.gScore+10
      }else{
        tentativeGscoreToNeighbor=currentNode.gScore+1
      }

      if(tentativeGscoreToNeighbor<neighbor.gScore){
        // console.log(neighbor)
        neighbor.gScore=tentativeGscoreToNeighbor
        neighbor.hScore=getManhattanDistance(neighbor,finishNode)
        neighbor.fScore = neighbor.gScore + neighbor.hScore;
        neighbor.previousNode = currentNode;
        // console.log(openSet)
        if (!isInSet(neighbor, openSet)) {
          openSet.push(neighbor);
        }
      }
    }
    
  }
  
  return visitedNodesInOrder
}
function sortNodesByFscore(nodes){
  nodes.sort((nodeOne, nodeTwo) => nodeOne.fScore - nodeTwo.fScore);
}

function isInSet(node, set) {
  for (let i = set.length - 1; i >= 0; i++) {
    if (set[i].row === node.row && set[i].col === node.col) {
      return true;
    } else {
      return false;
    }
  }
}

function getManhattanDistance(currentNode, finishNode) {
    const currentNodeRow=currentNode.row
    const currentNodeCol=currentNode.col
    const finishNodeRow=finishNode.row
    const finishNodeCol=finishNode.col
    
    const manhattanDistance= Math.abs(currentNodeCol-finishNodeCol)+Math.abs(currentNodeRow-finishNodeRow)
    
    return manhattanDistance
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors
}
export function getShortestAstarPath(finishNode) {
  
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    if(currentNode!==undefined){
      currentNode = currentNode.previousNode;
    }else{
      console.log(nodesInShortestPathOrder)
      return nodesInShortestPathOrder;
    }
  }
}