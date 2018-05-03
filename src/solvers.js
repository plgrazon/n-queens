/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findSolution = function(row, n, board, hasConflict, cb, onlyOne) {
  if (row === n) {
    return cb();
  }
  
  for (var i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if (!board[hasConflict]()) {
      var result = findSolution(row + 1, n, board, hasConflict, cb, onlyOne);
      if (result && onlyOne) {
        return result;      
      }
    }
    board.togglePiece(row, i);
  }
};//O(n!);

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution = findSolution(0, n, board, 'hasAnyRooksConflicts', () => board.roo90ws(), true);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};//O(n!);

window.findAllNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutions = [];
  findSolution(0, n, board, 'hasAnyRooksConflicts', 
    () => solutions.push(board.rows().map((row) => row.slice())), 
    false);
  return solutions;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;
  
  findSolution(0, n, board, 'hasAnyRooksConflicts', () => solutionCount++, false);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount; //O(n!);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = findSolution(0, n, board, 'hasAnyQueensConflicts', () => board.rows(), true); //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution; //O(n!);
};

window.findAllNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var solutions = [];
  findSolution(0, n, board, 'hasAnyQueensConflicts', 
    () => solutions.push(board.rows().map((row) => row.slice())), 
    false);
  return solutions;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0; //fixme
  
  findSolution(0, n, board, 'hasAnyQueensConflicts', () => solutionCount++, false);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount; //O(n!);
};
