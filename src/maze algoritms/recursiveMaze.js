export default function recursiveDivisionMaze (grid){
    console.log('rd start');
    const nodesToAnimate = []

    const isPassage = grid.map(row=>row.map(cell=>false))

    //make edges wall. just for more beautiful look
    grid[0].map(cell=>addToArray(nodesToAnimate,cell));

    grid.map(row=>row.map((node,index)=> {
        if(index==grid[0].length-1){
            if(node.type!=='start'||node.type!=='finish'){
              addToArray(nodesToAnimate,node)
            }
        }
    }));

    grid[grid.length-1].reverse().map(cell=>addToArray(nodesToAnimate,cell));

    grid.map(row=>row.map((cell, index)=> index==0  && addToArray(nodesToAnimate,cell)));


    let firstRow = 1;
    let lastRow = grid.length - 2;
    let firstCol = 1;
    let lastCol = grid[0].length - 2;

   let orientation = chooseOrientation(grid,firstRow,lastRow,firstCol,lastCol);
    devide(grid,firstRow,lastRow,firstCol,lastCol,orientation,nodesToAnimate,isPassage);

    
    

    return nodesToAnimate
}


//-------------------------
//   Recursive Devision Helper Functions
//---------------------------


//#1-choose orientation
const chooseOrientation = (grid,firstRow,lastRow,firstCol,lastCol) =>{
    let width = lastCol - firstCol;
    let height = lastRow - firstRow;
    if(width>height){
        return 'Vertical'
    }else if(height>width){
        return 'Horizontal'
    }else{
        const num = Math.random();
        return (num<0.5) ? 'Vertical' : 'Horizontal'
    }
}


//#2- devide
const devide = (grid,firstRow,lastRow,firstCol,lastCol,orientation,nodesToAnimate,isPassage) =>{
    let width = lastCol - firstCol + 1;
    let height = lastRow - firstRow + 1;

    let firstValidRow = firstRow ;
    let lastValidRow = lastRow;
    let firstValidCol = firstCol;
    let lastValidCol = lastCol;


    if(orientation=='Horizontal'){
        firstValidRow += 1
        lastValidRow -= 1
    }else{
        firstValidCol += 1
        lastValidCol -= 1
    }
    

    let validWidth = lastValidCol - firstValidCol + 1;
    let validHeight = lastValidRow - firstValidRow + 1;
    

    if(width<2 || height<2 || validHeight<1 || validWidth<1) return;

    if(orientation=='Horizontal'){


        let rowIdxToBeWall = Math.floor(Math.random()* validHeight) + firstValidRow;
        //let passageIdx = Math.floor(Math.random() * validWidth) + firstValidCol;

        let passageIdx;
        if (isPassage[rowIdxToBeWall][firstCol-1]){
			 passageIdx = firstCol;
		} else if (isPassage[rowIdxToBeWall][lastCol+1]){
			 passageIdx = lastCol;
		} else {
			 passageIdx = Math.random()>0.5 ? firstCol: lastCol; // random end assignment
        }

        grid[rowIdxToBeWall].forEach((node, index)=>{
            if(node.type==='start'||node.type==='finish'){
                isPassage[rowIdxToBeWall][index] = true;
            }
            if(isPassage[rowIdxToBeWall][index]) return
            if(index< firstValidCol  || index>lastValidCol) return;
            if(index==passageIdx){
                isPassage[rowIdxToBeWall][index] = true;
                return
            }
            
             addToArray(nodesToAnimate,node)
            
        })

        // upper side
        let orientation = chooseOrientation(grid,firstRow,rowIdxToBeWall-1,firstCol,lastCol);
        devide(grid,firstRow,rowIdxToBeWall-1,firstCol,lastCol,orientation,nodesToAnimate,isPassage);

        //Bottom side
        orientation = chooseOrientation(grid,rowIdxToBeWall+1,lastRow,firstCol,lastCol);
        devide(grid,rowIdxToBeWall+1,lastRow,firstCol,lastCol,orientation,nodesToAnimate,isPassage);


    }else{

        let colIdxToBeWall = Math.floor(Math.random()* validWidth ) + firstValidCol;
        //let passageIdx = Math.floor(Math.random() * validHeight) + firstValidRow;


        let passageIdx;
        if (firstRow-1>=0 && isPassage[firstRow-1][colIdxToBeWall]){
			passageIdx = firstRow;
		} else if (lastRow+1<grid.length && isPassage[lastRow+1][colIdxToBeWall]){
			passageIdx = lastRow;
		} else {
			passageIdx = Math.random()>0.5 ? firstRow: lastRow; // random end assignment
		}

        grid.forEach((row, index)=>{
            
            if (index<firstValidRow || index>lastValidRow) return;
            if (index == passageIdx){
                isPassage[index][colIdxToBeWall] = true;
                return;
            }

            row.forEach((node, idx)=>{

                if(node.type==='start'||node.type==='finish'){
                    isPassage[index][idx] = true;
                }
                if(isPassage[index][idx]) return;
                
                idx==colIdxToBeWall && nodesToAnimate.push(node);
        })});


        //left side
        orientation = chooseOrientation(grid,firstRow,lastRow,firstCol,colIdxToBeWall-1);
        devide(grid,firstRow,lastRow,firstCol,colIdxToBeWall - 1 ,orientation,nodesToAnimate,isPassage);


        //right side
        orientation = chooseOrientation(grid,firstRow,lastRow,colIdxToBeWall + 1,lastCol);
        devide(grid,firstRow,lastRow,colIdxToBeWall + 1, lastCol ,orientation,nodesToAnimate,isPassage);

    }

}
function addToArray(array,node){
    if(node.type!=='start'&&node.type!=='finish'){
        array.push(node)        
    }
}

