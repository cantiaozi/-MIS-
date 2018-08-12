function createTable(options, data) {
    var regionNum = getCheckedNum("region-radio-wrapper");
    var productNum = getCheckedNum("product-radio-wrapper");
    tableWrapper.innerHTML = "";
    var table = document.createElement("table");
    table.addEventListener("mouseout", mouseleaveListener, false)
    table.border = 1;
    table.cellspacing = "0";
    tableWrapper.appendChild(table);
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    tbody.insertRow(0);
    if(regionNum === 1 && productNum > 1) {
        for(var i = 0; i < 14; i++) {
            tbody.rows[0].insertCell(i);
            if(i === 0) {
                tbody.rows[0].cells[i].appendChild(document.createTextNode("地区"));
            } else if(i === 1) {
                tbody.rows[0].cells[i].appendChild(document.createTextNode("商品"))
            } else {
                tbody.rows[0].cells[i].appendChild(document.createTextNode((i-1) + "月"))
            }   
        }
        for(i = 0; i < data.length; i++) {
            tbody.insertRow(i+1);
            tbody.rows[i+1].className = data[i].region + data[i].product;
            tbody.rows[i+1].addEventListener("mouseover", mouseoverListener, false)
            for(var j = 0; j < 14; j++) {
                if(i > 0 && j === 13) {
                    continue;
                }
                tbody.rows[i+1].insertCell(j);
                if(i === 0 && j === 0) {//渲染地区的第一行
                    tbody.rows[i+1].cells[j].appendChild(document.createTextNode(data[0].region));
                    tbody.rows[i+1].cells[j].rowSpan = options[1].length
                } else if(i > 0 && j === 0) {
                    tbody.rows[i+1].cells[j].appendChild(document.createTextNode(data[i].product))
                } else if(i === 0 && j === 1){
                    tbody.rows[i+1].cells[j].appendChild(document.createTextNode(data[i].product))
                } else if(i === 0 && j > 1){
                    tbody.rows[i+1].cells[j].appendChild(document.createTextNode(data[i].sale[j-2]))///
                } else {
                    tbody.rows[i+1].cells[j].appendChild(document.createTextNode(data[i].sale[j-1]))
                }
            }
        }
    } else {
        for(var i = 0; i < 14; i++) {
            tbody.rows[0].insertCell(i);
            if(i === 0) {
                tbody.rows[0].cells[i].appendChild(document.createTextNode("商品"));
            } else if(i === 1) {
                tbody.rows[0].cells[i].appendChild(document.createTextNode("地区"))
            } else {
                tbody.rows[0].cells[i].appendChild(document.createTextNode((i-1) + "月"))
            }   
        }
        for(i = 0; i < data.length; i++) {
            tbody.insertRow(i+1);
            tbody.rows[i+1].className = data[i].region + data[i].product;
            tbody.rows[i+1].addEventListener("mouseover", mouseoverListener, false)
            for(var j = 0; j < 14; j++) {
                if(i%options[0].length !== 0 && j === 13) {
                    continue;
                }
                tbody.rows[i+1].insertCell(j);
                if(i%options[0].length === 0 && j === 0) {//渲染商品的第一行
                    tbody.rows[i+1].cells[j].appendChild(document.createTextNode(data[i].product));
                    tbody.rows[i+1].cells[j].rowSpan = options[0].length
                } else if(i%options[0].length !== 0 && j === 0) {
                    tbody.rows[i+1].cells[j].appendChild(document.createTextNode(data[i].region));
                } else if(i%options[0].length === 0 && j === 1){
                    tbody.rows[i+1].cells[j].appendChild(document.createTextNode(data[i].region))
                } else if(i%options[0].length === 0 && j > 1){
                    tbody.rows[i+1].cells[j].appendChild(document.createTextNode(data[i].sale[j-2]))///
                } else{
                    tbody.rows[i+1].cells[j].appendChild(document.createTextNode(data[i].sale[j-1]))
                }
            }
        }
    }
}

function mouseoverListener(e) {
    console.log("mouseover", e.target.parentNode.className)
    var data = [];
    for(var i = 0; i < sourceData.length; i++) {
        if(e.target.parentNode.className.indexOf(sourceData[i].region) !== -1 && e.target.parentNode.className.indexOf(sourceData[i].product) !== -1) {
            // console.log("datasource", sourceData[i]);
            getLine([sourceData[i]]);
            getChart(sourceData[i]);
        }
    }
}
function mouseleaveListener(e) {
    var options = getOptions();
    var data = getData(options);
    getLine(data);
}