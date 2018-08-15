function createState() {
    var region = [];
    var product = [];
    var regionDiv = document.getElementById("region-radio-wrapper");
    var productDiv = document.getElementById("product-radio-wrapper");
    var regionInputs = regionDiv.getElementsByTagName("input");
    var productInputs = productDiv.getElementsByTagName("input");
    for(var i = 1; i < regionInputs.length; i++) {
        if(regionInputs[i].checked) {
            region.push(regionInputs[i].value);
        }
    }
    for(i = 1; i < productInputs.length; i++) {
        if(productInputs[i].checked) {
            product.push(productInputs[i].value);
        }
    }

    var str = "?region=" + region.join(",") + "&product=" + product.join(",");
    var state = {};
    state["region"] = region;
    state["product"] = product;
    history.pushState(state, "", str);
}

function popStateListener(e) {
    var options = getOptionsFromURL();
    checkInput(options);
    var data = getData(options);
    createTable(options, data);
    getLine(data);
}
     