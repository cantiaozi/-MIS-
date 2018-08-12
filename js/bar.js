function getChart(data) {
    const xLength = 520;
    const yLength = 420; 
    const axisWidth = 1;
    const distance = 5;
    const rectWidth = (xLength - 20 - 12 * distance) / 12;
    const rectColor = "red";
    var svg = document.getElementById("svg");
    var axisY = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axisY.setAttribute("x1", "100");
    axisY.setAttribute("y1", yLength);
    axisY.setAttribute("x2", "100");
    axisY.setAttribute("y2", "0");
    axisY.setAttribute("stroke", "black");
    axisY.setAttribute("stroke-width", axisWidth);
    svg.appendChild(axisY);
    var axisX = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axisX.setAttribute("x1", "100");
    axisX.setAttribute("y1", yLength);
    axisX.setAttribute("x2", xLength + 100);
    axisX.setAttribute("y2", yLength);
    axisX.setAttribute("stroke", "black");
    axisX.setAttribute("stroke-width", axisWidth);
    svg.appendChild(axisX);

    var proportion = 0;
    var sortArray = data.sale.sort(function(a, b) {
        if(a < b) {
            return -1;
        } else {
            return 1;
        }
    });
    console.log("max", sortArray[sortArray.length-1]);
    proportion = (yLength-20) / sortArray[sortArray.length-1]; 
    for(var i = 0; i < data.sale.length; i++) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", rectWidth);
        rect.setAttribute("height", (data.sale[i] * proportion).toString())
        rect.setAttribute("x", (100+i*rectWidth+(i+1)*distance+axisWidth));
        rect.setAttribute("y", (420-(data.sale[i] * proportion)))
        rect.setAttribute("stroke-width", "0");
        rect.setAttribute("fill", rectColor);
        svg.appendChild(rect);
    }
}