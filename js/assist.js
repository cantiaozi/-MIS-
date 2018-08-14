var targetValue = "";
function getData(options) {
    return sourceData.filter(function(item) {
        // return item.region === options[0] && item.product === options[1];
        return options[0].indexOf(item.region) !== -1 && options[1].indexOf(item.product) !== -1;
    })
}
function getCheckedNum(divId) {
    var num = 0;
    var div = document.getElementById(divId);
    var children = div.getElementsByTagName("input");
    for(var i = 1; i < children.length; i++) {
        if(children[i].checked === true) {
            num++;
        }
    }
    return num;
}
function getOptions() {
    var options = new Array();
    options[0] = [];
    options[1] = [];
    var regionInputs = document.getElementById("region-radio-wrapper").getElementsByTagName("input");
    var productInputs = document.getElementById("product-radio-wrapper").getElementsByTagName("input");
    if(regionInputs[0].checked) {
        options[0] = ["华东", "华南", "华北"];
    } else {
        for(var i = 1; i < regionInputs.length; i++) {
            if(regionInputs[i].checked) {
                options[0].push(regionInputs[i].value);
            }
        }
    }
    if(productInputs[0].checked) {
        options[1] = ["手机", "笔记本", "智能音箱"];
    } else {
        for(var j = 1; j < productInputs.length; j++) {
            if(productInputs[j].checked) {
                options[1].push(productInputs[j].value);
            }
        }
    }
    return options;
}
function savaData() {
    // var data = [];
    var product = "";
    var region = "";
    var trs = document.getElementsByTagName("tr");
    // console.log("trs", trs)
    var tds = [];
    var dataTds = [];
    var sourceCopy = [];
    for(var l = 0; l < sourceData.length; l++) {
        var obj = Object.assign({}, sourceData[l]);
        obj.sale = [].concat(sourceData[l].sale);
        sourceCopy.push(obj) ;
    }
    if(trs[0].getElementsByTagName("td")[0].innerHTML === "商品") {
        for(var i = 1; i < trs.length; i++) {
            dataTds = [];
            tds = trs[i].getElementsByTagName("td");
            if(tds.length === 14) {
                product = tds[0].innerHTML;
                region = tds[1].innerHTML;
                for(var j = 2; j < tds.length; j++) {
                    dataTds.push(tds[j]);
                }
                sourceCopy = getRightData(region, product, sourceCopy, dataTds);
            } else {
                if(trs[i-1].getElementsByTagName("td").length === 14) {
                    product = trs[i-1].getElementsByTagName("td")[0].innerHTML;
                } else {
                    product = trs[i-2].getElementsByTagName("td")[0].innerHTML;
                }
                region = tds[0].innerHTML;
                for(var j = 1; j < tds.length; j++) {
                    dataTds.push(tds[j]);
                }
                sourceCopy = getRightData(region, product, sourceCopy, dataTds);
            }
        }
    } else {
        for(var i = 1; i < trs.length; i++) {
            tds = trs[i].getElementsByTagName("td");
            if(tds.length === 14) {
                region = tds[0].innerHTML;
                product = tds[1].innerHTML;
                for(var j = 2; j < tds.length; j++) {
                    dataTds.push(tds[j]);
                }
                sourceCopy = getRightData(region, product, sourceCopy, dataTds);
            } else {
                if(trs[i-1].getElementsByTagName("td").length === 14) {
                    region = trs[i-1].getElementsByTagName("td")[0].innerHTML;
                } else {
                    region = trs[i-2].getElementsByTagName("td")[0].innerHTML;
                }
                product = tds[1].innerHTML;
                for(var j = 1; j < tds.length; j++) {
                    dataTds.push(tds[j]);
                }
                sourceCopy = getRightData(region, product, sourceCopy, dataTds);
            }
        }
    }
    if(checkData(sourceCopy)) {
        console.log("dfesgowgke", sourceCopy )
        localStorage.setItem("newData", JSON.stringify(sourceCopy))
    } else {
        alert("请输入数字，然后保存")
    }
}
function getRightData(region, product, sourceCopy, tds) {
    var rightData = "";
    for(var i = 0; i < 9; i++) {
        if(sourceCopy[i].region === region && sourceCopy[i].product === product) {
            for(var j = 0; j < 12; j++) {
                // rightData = tds[j].getElementsByTagName("input")[0].value
                rightData = tds[j].innerHTML;
                sourceCopy[i].sale[j] = Number(rightData);
                
            }
        }
    }
    return sourceCopy;
}
function checkData(data) {
    var pattern = /^[0-9]+$/;
    for(var i = 0; i < data.length; i++) {
        for(var j = 0; j < 12; j++) {
            if(!pattern.test(data[i].sale[j])) {
               
                return false;
            }
        }
    }
    return true;
}
function checkValue(value) {
    var pattern = /^[0-9]+$/;
    if(!pattern.test(value)) {  
        return false;
    } else {
        return true;
    }
    
}
function clickListener(e) {
    console.log("click e", e.target.nodeName);
    if((e.target.nodeName.toLowerCase() === "td" && e.target.getElementsByTagName("input").length === 0) ) {//将表格变为编辑状态

        // console.log("bianji")
        // var input = document.createElement("input");
        targetValue = e.target.getElementsByTagName("span")[0].innerHTML;
        // input.value = e.target.getElementsByTagName("span")[0].innerHTML;
        // var cancelButton = document.createElement("button");
        // cancelButton.innerHTML = "取消";
        // var sureButton = document.createElement("button"); 
        // sureButton.innerHTML = "确定";
        // e.target.innerHTML = "";
        // e.target.appendChild(input);
        // e.target.appendChild(cancelButton);
        // e.target.appendChild(sureButton);
        console.log("edit value", e.target.getElementsByTagName("span")[0].innerHTML)
        editTable(e.target.getElementsByTagName("span")[0].innerHTML, e.target);
    } else if(e.target.nodeName.toLowerCase() === "span" && e.target.parentNode.getElementsByTagName("input").length === 0) {//将表格变为编辑状态
        targetValue = e.target.parentNode.getElementsByTagName("span")[0].innerHTML;
        editTable(e.target.parentNode.getElementsByTagName("span")[0].innerHTML, e.target.parentNode);
    } else if(e.target.nodeName.toLowerCase() === "button" && e.target.innerHTML === "取消") {//取消编辑状态
        var span = document.createElement("span");
        span.innerHTML = targetValue;
        var anotherSpan = document.createElement("span");
        anotherSpan.innerHTML = "编辑";
        anotherSpan.setAttribute("class", "edit")
        var parentTd = e.target.parentNode;
        e.target.parentNode.innerHTML = "";
        parentTd.appendChild(span);//当将e.target.parentNode 的innerHTML清空后，e.target.parentNode 就成为了null
        parentTd.appendChild(anotherSpan);
    } else if(e.target.nodeName.toLowerCase() === "button" && e.target.innerHTML === "确定") {//编辑后确定
        if(checkValue(e.target.parentNode.getElementsByTagName("input")[0].value)) {
            var span = document.createElement("span");
            span.innerHTML = e.target.parentNode.getElementsByTagName("input")[0].value;
            var anotherSpan = document.createElement("span");
            anotherSpan.innerHTML = "编辑";
            anotherSpan.setAttribute("class", "edit")
            var parentTd = e.target.parentNode;
            e.target.parentNode.innerHTML = "";
            console.log("edit sure", e.target, e.target.parentNode)
            parentTd.appendChild(span);
            parentTd.appendChild(anotherSpan);
        } else {
            alert("输入有误，请重新输入")
        }       
    }

}
function editTable(value, targetTd) {
    var input = document.createElement("input");
        // targetValue = e.target.getElementsByTagName("span")[0].innerHTML;
        input.value = value;
        var cancelButton = document.createElement("button");
        cancelButton.innerHTML = "取消";
        var sureButton = document.createElement("button"); 
        sureButton.innerHTML = "确定";
        targetTd.innerHTML = "";
        targetTd.appendChild(input);
        targetTd.appendChild(cancelButton);
        targetTd.appendChild(sureButton);
}