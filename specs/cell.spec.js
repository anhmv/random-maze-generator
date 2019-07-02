import Graph from '../src/Graph';
import Cell from '../src/Cell';

describe("Cell", function() {
  let cell;
  let graph;

  beforeEach(() => {
    graph = new Graph(12, 12);
    cell = graph.getCellAt(10, 10);
  });

  describe('coordinates', function() {
    it("should have a x coordinate", function() {
      expect(cell.x).toEqual(10);
    });

    it("should have a y coordinate", function() {
      expect(cell.y).toEqual(10);
    });
  });

  describe('visited', function () {
    it('should not be initially visited', function() {
      expect(cell.visited).toBeFalsy();
    });

    it('should be able to visit cell', function() {
      cell.visit();
      expect(cell.visited).toBeTruthy();
    });
  });
});