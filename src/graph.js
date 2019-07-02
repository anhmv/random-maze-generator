import Cell from './Cell';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import find from 'lodash/find';
import reject from 'lodash/reject';

var Graph = function(width, height) {
  this.width = width;
  this.height = height;
  this.cells = [];
  this.removedEdges = [];

  var self = this;

  this.getCellAt = function (x, y) {
    if(x >= this.width || y >= this.height || x < 0 || y < 0) {
    	return null;
    }
    if(!this.cells[x]) {
    	return null;
    }
    return this.cells[x][y];
  };

  this.getCellDistance = function (cell1, cell2) {
    var xDist = Math.abs(cell1.x - cell2.x);
    var yDist = Math.abs(cell1.y - cell2.y);
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  },

  // Returns true if there is an edge between cell1 and cell2
  this.areConnected = function(cell1, cell2) {
  	if(!cell1 || !cell2) {
  		return false;
  	}
  	if(Math.abs(cell1.x - cell2.x) > 1 ||
  		Math.abs(cell1.y - cell2.y) > 1) {
  		return false;
  	}

  	var removedEdge = find(this.removedEdges, function(edge) {
  		return includes(edge, cell1) && includes(edge, cell2);
  	});

  	return removedEdge == undefined;
  };

  this.cellUnvisitedNeighbors = function(cell) {
  	return filter(this.cellConnectedNeighbors(cell), function(c) {
      return !c.visited;
    });
  };

  // Returns all neighbors of this cell that ARE separated by an edge (maze line)
  this.cellConnectedNeighbors = function(cell) {
    return filter(this.cellNeighbors(cell), (c) => this.areConnected(cell, c));
  };

  // Returns all neighbors of this cell that are NOT separated by an edge
  // This means there is a maze path between both cells.
  this.cellDisconnectedNeighbors = function (cell) {
    return reject(this.cellNeighbors(cell), (c) => this.areConnected(cell, c));
  }

  // Returns all neighbors of this cell, regardless if they are connected or not.
  this.cellNeighbors = function (cell) {
    var neighbors = [];
    var topCell = this.getCellAt(cell.x, cell.y - 1);
    var rightCell = this.getCellAt(cell.x + 1, cell.y);
    var bottomCell = this.getCellAt(cell.x, cell.y + 1);
    var leftCell = this.getCellAt(cell.x - 1, cell.y);

    if(cell.y > 0 && topCell) {
      neighbors.push(topCell);
    }
    if(cell.x < this.width && rightCell) {
      neighbors.push(rightCell);
    }
    if(cell.y < this.height && bottomCell) {
      neighbors.push(bottomCell);
    }
    if(cell.x > 0 && leftCell) {
      neighbors.push(leftCell);
    }

    return neighbors;
  }

  this.removeEdgeBetween = function(cell1, cell2) {
  	this.removedEdges.push([cell1, cell2]);
  };

  for(var i = 0; i < this.width; i++) {
  	this.cells.push([]);
  	let row = this.cells[i];

  	for(var j = 0; j < this.height; j++) {
  		var cell = new Cell(i, j, this);
  		row.push(cell);
  	}
  }
};

export default Graph;