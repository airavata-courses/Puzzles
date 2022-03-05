/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 64.60505705974491, "KoPercent": 35.39494294025509};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.2244349966435444, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.07450370724707008, 500, 1500, "Get Search History Request"], "isController": false}, {"data": [0.566209443418623, 500, 1500, "Logout Request"], "isController": false}, {"data": [0.2208307242746817, 500, 1500, "Get Profile Request"], "isController": false}, {"data": [0.2292840743059904, 500, 1500, "Login Request"], "isController": false}, {"data": [0.08359423919849718, 500, 1500, "Add Search History Request"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 22345, 7909, 35.39494294025509, 6919.942805996888, 2, 98728, 1893.0, 27486.000000000015, 42555.45000000007, 60167.990000000005, 131.5820466617202, 143.4478923299503, 41.380405465336416], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Get Search History Request", 4181, 2215, 52.97775651757953, 14805.319540779725, 2, 98728, 3835.0, 46542.60000000001, 60145.899999999994, 74490.50000000009, 24.64108064782291, 27.249498676890074, 6.740523575078385], "isController": false}, {"data": ["Logout Request", 3791, 704, 18.570298074386706, 1371.7103666578744, 2, 7298, 284.0, 4713.400000000001, 5311.199999999997, 5908.32, 22.436997668114724, 22.23649146146767, 6.396518475677963], "isController": false}, {"data": ["Get Profile Request", 4791, 1440, 30.05635566687539, 2449.2784387393067, 2, 15216, 1210.0, 6119.000000000001, 8270.199999999999, 12223.319999999998, 28.32648476069412, 29.646274610518226, 8.573443320054986], "isController": false}, {"data": ["Login Request", 4791, 846, 17.658108954289293, 3421.558756000835, 5, 15795, 3009.0, 7330.6, 10187.199999999993, 12797.24, 28.318615455544915, 33.59621013723387, 7.217928353415258], "isController": false}, {"data": ["Add Search History Request", 4791, 2704, 56.43915675224379, 12397.776247130058, 2, 60120, 4755.0, 40058.4, 47760.79999999999, 58150.59999999999, 28.224689976140684, 31.112724923782732, 12.556783244720021], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["502/Bad Gateway", 1727, 21.835883171070932, 7.72879838890132], "isController": false}, {"data": ["504/Gateway Timeout", 1084, 13.705904665570868, 4.851197135824569], "isController": false}, {"data": ["504/Gateway Time-out", 98, 1.2390947022379568, 0.4385768628328485], "isController": false}, {"data": ["500/Internal Server Error", 65, 0.8218485269945631, 0.2908928171850526], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1000, 12.64382349222405, 4.475274110539271], "isController": false}, {"data": ["401/Unauthorized", 3935, 49.75344544190163, 17.61020362497203], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 22345, 7909, "401/Unauthorized", 3935, "502/Bad Gateway", 1727, "504/Gateway Timeout", 1084, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1000, "504/Gateway Time-out", 98], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["Get Search History Request", 4181, 2215, "401/Unauthorized", 1319, "502/Bad Gateway", 442, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 390, "504/Gateway Time-out", 64, null, null], "isController": false}, {"data": ["Logout Request", 3791, 704, "504/Gateway Timeout", 537, "502/Bad Gateway", 167, null, null, null, null, null, null], "isController": false}, {"data": ["Get Profile Request", 4791, 1440, "401/Unauthorized", 1307, "502/Bad Gateway", 133, null, null, null, null, null, null], "isController": false}, {"data": ["Login Request", 4791, 846, "504/Gateway Timeout", 547, "502/Bad Gateway", 234, "500/Internal Server Error", 65, null, null, null, null], "isController": false}, {"data": ["Add Search History Request", 4791, 2704, "401/Unauthorized", 1309, "502/Bad Gateway", 751, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 610, "504/Gateway Time-out", 34, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
