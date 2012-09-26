var Tumblrtable = function (type, data, wrapper) {
    this.init(type, data, wrapper)
  }

  Tumblrtable.prototype = {

    init: function(type, data, wrapper) {
      this.longestCell = 0;
      var that = this,
          table = [];

      switch (type) {
        case 'json':
          data = JSON.parse(data);

          if (data instanceof Array) {
            // assume each array element has same keys
            header = Object.keys(data[0]);
            header.forEach(function(value) {
                that.checkLongestCell(value.length);
            });

            table.push(header);

            data.forEach(function(el, i) {
              var row = [];

              for (var key in el) {
                cell = el[key];
                that.checkLongestCell(cell.length);
                row.push(cell);
              }

              table.push(row);
            });
          } else {
            alert('works better if you pass in an array');
          }
          break;
        case 'csv':
          alert('open issue for support');
          break;
        default:
          alert('unsupported');
      }

      that.buildFakeTable(table, wrapper);
    },
    checkLongestCell: function(len) {
      if (len > this.longestCell) {
        this.longestCell = len;
      }
    },
    // pad the content value with a padder to make columns
    padData: function(padder, padding, content) {
      for (var p = 0; p < padding; p++) {
        content = content + padder;
      }
      
      return content;
    },
    buildFakeTable: function(tableData, rowWrap) {
      var that = this,
          result = "",
          // pad right side of "cells"
          maxLength = this.longestCell++;

      tableData.forEach(function(row, index) {
          var rowHTML = "<" + rowWrap + ">";
          row.forEach(function(cell, index) {
              padding = maxLength - cell.toString().length;
              rowHTML = rowHTML + that.padData("&nbsp;", padding, cell) + "|&nbsp;";
          });
          result = result + rowHTML + "</" + rowWrap + ">";
      });
      
      this.result = result;
    }
  }