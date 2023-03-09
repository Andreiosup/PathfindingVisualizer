export default function prim  (grid,mazeSpeed){
    
    let start;
    let end;
    grid.map((row,index)=>row.map((cell,idx)=>{
        if(cell.type==='start'){
            start = [index,idx];
            return;
        }else if(cell.type==='finish'){
            end = [index,idx];
            return;
        }else{
            cell.type='wall';
        }
        
    }));

    const isWall = grid.map(row=>row.map(cell=>true));
    const visited = grid.map(row=>row.map(cell=>false));

    let currentRow = Math.floor(Math.random()*grid.length);
    let currentCol = Math.floor(Math.random()*grid[0].length);

    const frontiersList = [];

    const nodesToRemoveWall = [];

    nodesToRemoveWall.push(grid[currentRow][currentCol]);

    isWall[currentRow][currentCol] = false;

    let frontiers = getFrontiers(grid,currentRow,currentCol,isWall,visited);
    

    for(let i=0; i<frontiers.length; i++){
        frontiersList.push(frontiers[i])
        let [row,col] = frontiers[i]
        visited[row][col] = true;
    }
   
    while (frontiersList.length>0){
       
        let selectedIdx = Math.floor(Math.random()*frontiersList.length);

        let [currentRow,currentCol] = frontiersList[selectedIdx];

        let neighbors = getNeighborsPrime(grid,currentRow,currentCol,isWall);

        let randomNeighborIdx = Math.floor(Math.random()*neighbors.length);

        let neighbor = neighbors[randomNeighborIdx];

        let [neighborRow,neighborCol] = neighbor;

        let wall = getCellBeetween(neighborRow,neighborCol,currentRow,currentCol,grid);

        nodesToRemoveWall.push(wall);

        nodesToRemoveWall.push(grid[currentRow][currentCol]);

        isWall[neighborRow][neighborCol] = false;
        isWall[currentRow][currentCol] =false;

        frontiers = getFrontiers(grid,currentRow,currentCol,isWall,visited);

        for(let i=0; i<frontiers.length;i++){
            frontiersList.push(frontiers[i]);
            let [row,col] = frontiers[i]
            visited[row][col] = true;
        }

        frontiersList.splice(selectedIdx,1)

        }

        
      

   
        
       

        


        return nodesToRemoveWall

    }
    const getFrontiers = (grid,currentRow,currentCol,isWall,visited)=>{
        let possibleNeighbors = [
            [currentRow,currentCol-2],
            [currentRow, currentCol+2],
            [currentRow-2, currentCol],
            [currentRow+2,currentCol]
        ]
    
        let frontiers=[]
        for(let i=0; i<possibleNeighbors.length; i++){
            let [row,col] = possibleNeighbors[i];
            if(row>=0 && row<grid.length && col>=0 && col<grid[0].length){
                if (isWall[row][col] && !visited[row][col]){
                    frontiers.push([row,col])
                }
               
            }
        }
    
        return frontiers;
    }
    
    const getNeighborsPrime = (grid,currentRow,currentCol,isWall)=>{
        let possibleNeighbors = [
            [currentRow,currentCol-2],
            [currentRow, currentCol+2],
            [currentRow-2, currentCol],
            [currentRow+2,currentCol]
        ]
    
        let neighbors=[]
        for(let i=0; i<possibleNeighbors.length; i++){
            let [row,col] = possibleNeighbors[i];
            if(row>=0 && row<grid.length && col>=0 && col<grid[0].length){
                if (isWall[row][col]){
                    continue
                }else{
                    neighbors.push([row,col])
                }
               
            }
        }
    
        return neighbors;
    }
    
    
    
const getCellBeetween = (row1,col1,row2,col2,grid)=>{
    if(row1==row2){
        if(col1>col2){
            return grid[row1][col2+1]
        }else{
            return grid[row1][col1+1]
        }
        
    }else if(col1===col2){
        if(row2>row1){
            return grid[row1+1][col1]
        }else{
            return grid[row2+1][col1]
        }
    }
}
