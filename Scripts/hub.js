$(function () {
    // Declare a proxy to reference the hub. 
    var hub = $.connection.factoriesHub;

    hub.client.updateTree = function (id, updatedData) {
        tree.render(JSON.parse(updatedData));
        var node = tree.getNodeByText('Root');
        tree.expand(node);

        if (id !== null && id > 0) {
            var selectedNode = tree.getNodeById(id);
            tree.select(selectedNode);
            tree.expand(selectedNode, false);
        }
    }

    // Start the connection.
    $.connection.hub.start().done(function () {
        $('#btnForm_addFactory').click(function () {
            if (!validate())
                return;

            var factory = {
                name: $('#txtForm_Node_Name').val(),
                numberOfSeeds: $('#txtForm_Node_numberOfNodes').val(),
                seedStartRange: $('#txtForm_Node_startRange').val(),
                seedEndRange: $('#txtForm_Node_endRange').val()
            };

            hub.server.addFactory(JSON.stringify(factory));
        });
        $('#btnForm_updateFactory').click(function () {
            if (!validate())
                return;

            var id = tree.getSelections()[0];

            if (!id)
                return;

            var factory = {
                name: $('#txtForm_Node_Name').val(),
                numberOfSeeds: $('#txtForm_Node_numberOfNodes').val(),
                seedStartRange: $('#txtForm_Node_startRange').val(),
                seedEndRange: $('#txtForm_Node_endRange').val()
            };

            hub.server.updateFactory(id, JSON.stringify(factory));
        });
        $('#btnForm_deleteFactory').click(function () {
            var id = tree.getSelections()[0];

            if (!id)
                return;

            hub.server.deleteFactory(id);
        });

        hub.server.loadFactories(0, true);
    });
});