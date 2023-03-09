export default function randomMaze(grid,type){
    console.log('aaaaaaaa')
    for(let row of grid){
        for(let node of row){
           
            if(node.type ==='finish'||node.type ==='start')continue
            let random = Math.random();
			let randomTwo =type==='wall'? 0.35: 0.25;
			if (random < randomTwo ) {
                console.log(node)
                console.log(node.type)
               node.type=type
               if(type==='weight'){
                node.weightValue=15
            }
            }
            
        }
    }
  return grid
}