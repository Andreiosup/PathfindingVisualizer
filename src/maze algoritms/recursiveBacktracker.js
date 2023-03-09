
export default function recursiveBacktracker (grid){
    
    
    
    grid.map(row=>row.map((node)=> {
        
            if(node.type==='start'||node.type==='finish')return
              node.type='wall'
            
        
    }));

    const visited = grid.map(row=>row.map(cell=>false));

    const nodesToRemoveWall = []

    let [currentRow,currentCol] = [0,0];
    
    visited[currentRow][currentCol] = true;

    let stack = []

    
    while(true){
        //counter += 1;

        nodesToRemoveWall.push(grid[currentRow][currentCol]);

    
    let next = getRBNeighbors(currentRow,currentCol, grid,visited);

    if(next){
        stack.push(next);

        let [nextRow,nextCol] = next;

        visited[nextRow][nextCol] = true;

        let wall = getCellBeetween(currentRow, currentCol,nextRow,nextCol,grid);

        nodesToRemoveWall.push(wall);

        currentRow = nextRow;
        currentCol = nextCol;

    }else{

        if(stack.length>0){

            next = stack.pop();

            let [nextRow, nextCol] = next;

            currentRow=nextRow;
            currentCol = nextCol;
        }else{
            break;
        }
       
    }
    }

    
    

    return nodesToRemoveWall;

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

const getRBNeighbors = (currentRow,currentCol,grid,visited)=>{

    let possibleNeighbors = [
        [currentRow+2,currentCol],
        [currentRow-2, currentCol],
        [currentRow, currentCol+2],
        [currentRow, currentCol-2]
    ]


    let neighbors = [];

    for(let i=0;i<possibleNeighbors.length;i++){
        let [row,col] = possibleNeighbors[i];
        if(row<0 || row>grid.length-1 || col<0 || col>grid[0].length-1) continue;
        if(visited[row][col]) continue;
        neighbors.push([row,col])
    }

    if(neighbors.length>0){
        const nextIdx = Math.floor(Math.random()*neighbors.length);
        return neighbors[nextIdx];
    }else{
        return;
    }

}

