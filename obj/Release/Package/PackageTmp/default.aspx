﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="passportchallengeapp.ParentForm" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Passport Challenge</title>
    <link href="https://cdn.jsdelivr.net/npm/gijgo@1.8.1/combined/css/gijgo.min.css" rel="stylesheet" type="text/css" />
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
    <link href="Content/default.css" rel="stylesheet" type="text/css" />
</head>
<body>

    <div class="container">

        <form id="form1" runat="server" novalidate>

            <div id="controlContainer">
                <label for="txtForm_Node_numberOfNodes">
                    <span>Factory Name</span>
                    <input type="text" id="txtForm_Node_Name" required />
                    <span id="nameErrorDisplay" class="errorDisplay" aria-live="polite"></span>
                </label>&nbsp;&nbsp;
                <label for="txtForm_Node_numberOfNodes">
                    <span>Number Of Children</span>
                    <input type="number" id="txtForm_Node_numberOfNodes" required min="1" max="15" />
                    <span id="numberOfNodesErrorDisplay" class="errorDisplay" aria-live="polite"></span>
                </label>&nbsp;&nbsp;
                <label for="txtForm_Node_startRange">
                    <span>Start Range</span>
                    <input type="number" id="txtForm_Node_startRange" required min="1" />
                    <span id="startRangeErrorDisplay" class="errorDisplay" aria-live="polite"></span>
                </label>&nbsp;&nbsp;
                <label for="txtForm_Node_endRange">
                    <span>End Range</span>
                    <input type="number" id="txtForm_Node_endRange" required min="1" />
                    <span id="endRangeErrorDisplay" class="errorDisplay" aria-live="polite"></span>
                </label>&nbsp;&nbsp;
                <br />
                <br />

                <input type="button" id="btnForm_addFactory" class="gj-button-md" value="Add" style="height:35px; width:85px" />&nbsp;&nbsp;
                <input type="button" id="btnForm_updateFactory" class="gj-button-md" value="Update" style="height:35px; width:85px" />&nbsp;&nbsp;
                <input type="button" id="btnForm_deleteFactory" class="gj-button-md" value="Delete" style="height:35px; width:85px" />
            </div>
            <br />

            <div id="treeContainer">
                <div id="tree"></div>
            </div>

        </form>

    </div>

    <!--Script references. -->
    <!--Reference the jQuery library. -->
    <script src="Scripts/jquery-3.3.1.min.js" ></script>
    <!--Reference gijgo javascript controls library -->
    <script src="https://cdn.jsdelivr.net/npm/gijgo@1.8.1/combined/js/gijgo.min.js" type="text/javascript"></script>
    <!--Reference bootstrap -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <!--Reference the SignalR library. -->
    <script src="Scripts/jquery.signalR-2.2.2.min.js"></script>
    <!--Reference the autogenerated SignalR hub script. -->
    <script src="signalr/hubs"></script>
    <!--Reference signalr user-defined related scripts.--> 
    <script src="Scripts/hub.js?version=2"></script>
    <!--Reference javascript user-defined default repository.--> 
    <script src="Scripts/default.js?version=2"></script>

</body>
</html>
