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

window.findSolution = function(row, n, board, hasConflict, cb) {
  if (row === n) {
    return cb();
  }
  
  // Are we stopping too early? Even if there's nowhere to place a piece
  // on a given row, sholdn't we move on to the next row anyway?
  
  for (var i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if (!board[hasConflict]()) {
      var result = findSolution(row + 1, n, board, hasConflict, cb);
      if (result) {
        return result;      
      }
    }
    board.togglePiece(row, i);
  }
};

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution = findSolution(0, n, board, 'hasAnyRooksConflicts', () => board.rows());

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;
  
  findSolution(0, n, board, 'hasAnyRooksConflicts', () => solutionCount++);
  
  // for (var i = 0; i < n; i++) {
  //   for (var j = 0; j < n; j++) {
  //     var solution = findNRooksSolution(i, j);
  //     if (solution !== undefined) {
  //       solutions.push(solution);
  //     }      
  //   }
  // }

  // solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
