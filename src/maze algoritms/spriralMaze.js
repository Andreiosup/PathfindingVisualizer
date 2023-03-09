export default function spiral (grid){
    console.log('spiral start')
    const nodesToAnimate = [];

    let firstRow =0
    let lastRow = grid.length-1;
    let firstCol = 0;
    let lastCol = grid[0].length-1;

    while (lastRow-firstRow>2&& lastCol-firstRow>2){
        for(let col=firstCol;col<lastCol;col++){
            nodesToAnimate.push(grid[firstRow][col])
            //console.log(grid[firstRow][col])
        }
        for(let row=firstRow;row<lastRow;row++){
            nodesToAnimate.push(grid[row][lastCol])
        }
        for(let col=lastCol;col>firstCol;col--){
            nodesToAnimate.push(grid[lastRow][col])
        }
        for(let row=lastRow;row>firstRow+2;row--){
            nodesToAnimate.push(grid[row][firstCol+1])
        }

        nodesToAnimate.push(grid[firstRow+3][firstCol+2])
        nodesToAnimate.push(grid[firstRow+3][firstCol+3])
        firstRow += 3
        lastRow -= 3
        firstCol += 4
        lastCol -=3
    }
   return nodesToAnimate
}
