var tree = $('#tree').tree({
    primaryKey: 'id',
    textField: 'name',
    disabledField: 'disabled',
    select: onNodeSelect
});

function onNodeSelect(e, node, id) {
    var data = tree.getDataById(id);
    $("#txtForm_Node_Name").val(data.name);
    $("#txtForm_Node_numberOfNodes").val(data.numberOfSeeds);
    $("#txtForm_Node_startRange").val(data.seedStartRange);
    $("#txtForm_Node_endRange").val(data.seedEndRange);
    validate();
}

$("input").focusout(function (e) {
    if ($(e.target).hasClass("controlChanged")) {
        validate(e);
    }
});
$("input").change(function (e) {
    $(e.target).addClass("controlChanged");
});
$("#txtForm_Node_Name").focus(function () {
    document.getElementById('nameErrorDisplay').innerHTML = "";
});
$("#txtForm_Node_numberOfNodes").focus(function () {
    document.getElementById('numberOfNodesErrorDisplay').innerHTML = "";
});
$("#txtForm_Node_startRange").focus(function () {
    document.getElementById('startRangeErrorDisplay').innerHTML = "";
});
$("#txtForm_Node_endRange").focus(function () {
    document.getElementById('endRangeErrorDisplay').innerHTML = "";
});

function validate(e) {
    var isValid = true;
    var regEx = new RegExp('');

    if (e === undefined || e.target.id === "txtForm_Node_Name") {
        var factoryName = document.getElementById('txtForm_Node_Name');
        var factoryNameErrorDisplay = document.getElementById('nameErrorDisplay');
        factoryNameErrorDisplay.innerHTML = "";
        factoryNameErrorDisplay.style.width = factoryName.offsetWidth + 'px';

        if (!factoryName.validity.valid) {
            if (factoryName.value === "") {
                factoryNameErrorDisplay.innerHTML = "Name is required.";
            }
            isValid = false;
        }

        //regEx = new RegExp("<(.|\n)*?>")
        regEx = new RegExp("<|>")
        if (regEx.test(factoryName.value) == true) {
            factoryNameErrorDisplay.innerHTML = "HTML markup is not allowed. Please remove all less than and greater than signs.";
            isValid = false;
        }
    }

    if (e === undefined || e.target.id === "txtForm_Node_numberOfNodes" || !e) {
        var numberOfNodes = document.getElementById('txtForm_Node_numberOfNodes');
        var numberOfNodesErrorDisplay = document.getElementById('numberOfNodesErrorDisplay');
        numberOfNodesErrorDisplay.innerHTML = "";
        numberOfNodesErrorDisplay.style.width = numberOfNodes.offsetWidth + 'px';

        if (!numberOfNodes.validity.valid) {
            if (numberOfNodes.value === "") {
                numberOfNodesErrorDisplay.innerHTML = "Number of children is required.";
            }
            else {
                numberOfNodesErrorDisplay.innerHTML = "The value must be a number between 1 and 15.";
            }
            isValid = false;
        }
    }

    if (e === undefined || e.target.id === "txtForm_Node_startRange" || !e) {
        var startRange = document.getElementById('txtForm_Node_startRange');
        var startRangeErrorDisplay = document.getElementById('startRangeErrorDisplay');
        startRangeErrorDisplay.innerHTML = "";
        startRangeErrorDisplay.style.width = startRange.offsetWidth + 'px';

        if (!startRange.validity.valid) {
            if (startRange.value === "") {
                startRangeErrorDisplay.innerHTML = "Start range is required.";
            }
            else {
                startRangeErrorDisplay.innerHTML = "Start range must be a numerical value greater than zero.";
            }
            isValid = false;
        }
    }

    if (e === undefined || e.target.id === "txtForm_Node_endRange" || !e) {
        var endRange = document.getElementById('txtForm_Node_endRange');
        var endRangeErrorDisplay = document.getElementById('endRangeErrorDisplay');
        endRangeErrorDisplay.innerHTML = "";
        endRangeErrorDisplay.style.width = endRange.offsetWidth + 'px';

        if (!endRange.validity.valid) {
            if (endRange.value === "") {
                endRangeErrorDisplay.innerHTML = "End range is required.";
            }
            else {
                endRangeErrorDisplay.innerHTML = "End range must be a numerical value greater than zero.";
            }
            isValid = false;
        }

        if (parseInt(endRange.value) < parseInt(document.getElementById('txtForm_Node_startRange').value)) {
            endRangeErrorDisplay.innerHTML = "End range must be greater than or equal to the start range.";
            isValid = false;
        }
    }

    return isValid;
}