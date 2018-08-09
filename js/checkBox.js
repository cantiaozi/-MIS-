function getCheckBox(divId) {
    var div = document.getElementById(divId);
    var children = div.getElementsByTagName("input");
    div.onclick = function(e) {
        // console.log("e.target", e.target.value, e.target.checked)
        if(e.target.value === "全部") {
            if(e.target.checked === false) {
                e.target.checked = true;
            } else {
                for(var i = 1; i < children.length; i++) {
                    children[i].checked = true;
                }
            }
        } else {
            if(e.target.checked === false) {
                var num = getCheckedNum(divId);
                if(num === 0) {
                    e.target.checked = true;
                } else if(num === 2) {
                    children[0].checked = false;
                }
            } else {
                var num = getCheckedNum(divId);
                if(num === 3) {
                    children[0].checked = true;
                }
            }
        }
        var options = getOptions();
        console.log("options", options);
        var data = getData(options);
        console.log("data", data)
        createTable(options, data)
    }
}