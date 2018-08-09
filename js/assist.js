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
