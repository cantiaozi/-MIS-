let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]
var selects = document.getElementById("region-select");
var tableWrapper = document.getElementById("table-wrapper");
selects.onchange = function(e) {
    var data = getData(selects.value);
    console.log("data", data)
    createTable(selects.value, data);
}
function getData(value) {
    return sourceData.filter(function(item) {
        return item.region === value;
    })
}
function createTable(value, data) {
    tableWrapper.innerHTML = "";
    console.log("diqu", value, "data", data)
    var head = document.createElement("p");
    head.innerHTML = value + "地区手机、电脑和音响一年的销售量";
    tableWrapper.appendChild(head)
    var table = document.createElement("table");
    table.border = 1;
    tableWrapper.appendChild(table);
    // var thead = document.createElement("thead");
    // thead.appendChild(document.createTextNode(value + "地区手机和电脑一年的销售量"))
    // table.appendChild(thead);
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    tbody.insertRow(0);
    for(var i = 0; i < 13; i++) {
        tbody.rows[0].insertCell(i);
        if(i === 0) {
            tbody.rows[0].cells[i].appendChild(document.createTextNode(""));
        } else {
            tbody.rows[0].cells[i].appendChild(document.createTextNode(i))
        }    
    }
    tbody.insertRow(1);
    for(i = 0; i < data.length; i++) {
        tbody.insertRow(i + 1);
        for(var j = 0; j < 13; j++) {
            tbody.rows[i+1].insertCell(j);
            if(j === 0) {
                tbody.rows[i+1].cells[j].appendChild(document.createTextNode(data[i].product));
                tbody.rows[i+1].cells[j].className = "region"
            } else {
                tbody.rows[i+1].cells[j].appendChild(document.createTextNode(data[i].sale[j-1]))
            }    
        }
    }
}