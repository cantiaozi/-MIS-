function getLine(data) {
    const xLength = 520;
    const yLength = 420; 
    const axisWidth = 1;
    const distance = (xLength - 20) / 12;
    const axisColor = "black";
    const lineColor = "red";
    const colors = ["red", "green", "blue", "black", "yellow", "orange", "purple", "aqua", "brown"] 

    var proportion = 0;
    var allData = [];
    for(var j = 0; j < data.length; j++) {
        // console.log("data[j]", data[j]);
        for(var i = 0; i < 12; i++) {
            allData.push(data[j].sale[i]);
        }
    }
    // var dataCopy = data.sale.concat([])
    allData.sort(function(a, b) {
        if(a < b) {
            return -1;
        } else {
            return 1;
        }
    });
    console.log("max", allData[allData.length-1]);
    proportion = (yLength-20) / allData[allData.length-1]; 

    var canvas = document.getElementById("canvas");
    if(canvas.getContext) {
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = axisColor;
        context.fillStyle = lineColor;
        context.lineWidth = axisWidth;
        context.beginPath();
        context.moveTo(100, 0);
        context.lineTo(100, yLength);
        context.lineTo(xLength+100, yLength);
        context.stroke();
        
        context.lineWidth = 0.2;
        for(j = 0; j < data.length; j++) {
            context.beginPath();
            context.fillStyle = colors[j];
            context.strokeStyle = colors[j];
            for( i = 0; i < 12; i++) {//画实心圆
                context.moveTo(100+distance*(i+1)+2.5, yLength-data[j].sale[i]*proportion);
                context.arc(100+distance*(i+1), yLength-data[j].sale[i]*proportion, 2.5, 0, 2*(Math.PI), false);
                context.fill();
            }
            context.beginPath();
            context.moveTo(100+distance, yLength-data[j].sale[0]*proportion)
            for(i = 1; i < 12; i++) {//画折线
                context.lineTo(100+distance*(i+1), yLength-data[j].sale[i]*proportion);
                context.stroke()
            }
        }
        // for(var i = 0; i < 12; i++) {//画实心圆
        //     context.moveTo(100+distance*(i+1)+2.5, yLength-data.sale[i]*proportion);
        //     context.arc(100+distance*(i+1), yLength-data.sale[i]*proportion, 2.5, 0, 2*(Math.PI), false);
        //     context.fill();
        // }
        // context.beginPath();
        // context.strokeStyle = "red";
        // context.moveTo(100+distance, yLength-data.sale[0]*proportion)
        // for(i = 1; i < 12; i++) {//画折线
        //     context.lineTo(100+distance*(i+1), yLength-data.sale[i]*proportion);
        //     context.stroke()
        // }
    }
}