class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
  }
 
  bindEvents(e) {
    let move = e.target;
    this.makeMove($(move));
  }
  
  makeMove($square) {
    if ($square.attr("class") === "x" || $square.attr("class") === "o") {
      alert("Invalid move");
    }

    let position = {0: [0,0], 1: [0,1], 2: [0,2], 3: [1,0], 4: [1,1],
    5: [1,2], 6: [2,0], 7: [2,1], 8: [2,2] };
    let move = $square.attr("position")
    
    if (this.game.isOver()) {
      if (this.game.winner()) {
        this.$el.append($(`<div>Congratulations, you won, ${this.game.winner()}!</div>`));
      } else {
        this.$el.append("<div>It's a draw.</div>")
      }
    }
    
    this.game.playMove(position[move]);
    if (this.game.currentPlayer === "x") {
      $square.addClass("o");
    } else {
      $square.addClass("x");
    }
    $square.html(`<div>${this.game.currentPlayer}</div>`);

  
  }
 
  setupBoard() {
    let $ul = $("<ul>");
    $ul.click(this.bindEvents.bind(this));
    for (let i=0; i<9; i++) {
      let $listItem = $("<li>");
      $listItem.attr("position", i);
      $ul.append($listItem);
    }
    this.$el.append($ul);
  }
}


module.exports = View;
