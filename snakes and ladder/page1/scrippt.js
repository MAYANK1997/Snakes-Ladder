$(function () {
  var $player1 = $('<div class="player1 lupid">')
  var $player2 = $('<div class="player2 pig">')
  var currentPlayer = $player1
  var totalStepsTakenByP1 = 0 
  var totalStepsTakenByP2 = 0

  var $circle = $('.circle') 

  var $dieButton = $('.dieButton')  
  $dieButton.on('click', rollDice)

  
  


  var $resetButton = $('.resetButton')
  $resetButton.on('click', resetButton)


  var $soundButton = $('.sound')
  $soundButton.on('click', playAudio)

  function playAudio () {
    document.getElementsByClassName('audio')[0].play()
  }

  function startPosition () {
    
    $('#0').append($player1) 
    $('#0').append($player2) 
  }

  function rollDice () {
    var randomDiceResult = 1 + Math.floor(Math.random() * 6)
    var $dieValue = $('.dieValue')
    $dieValue.text(`${randomDiceResult}`)
    
    player1Turn(randomDiceResult)
  

    autoPlayButton()
  }

  function player1Turn (randomDiceResult) {
    if (currentPlayer === $player1) {
      totalStepsTakenByP1 += randomDiceResult
      $player1.appendTo(`#${totalStepsTakenByP1}`) 
      $circle.css('left', '147px') 

      painOrPleasureP1()


      if (randomDiceResult === 6) {
        currentPlayer = $player1 
        $circle.css('left', '25px')
      } else { currentPlayer = $player2 }
    }
    else{

      currentPlayer = $player2
    }
    
  gameOver()
  
    
  }

  function player2Turn(){
  if(currentPlayer === $player2)
   {

      var randomno = 1 + Math.floor(Math.random() * 6)
      var $die = $('.dieValue')
      $die.text(`${randomno}`)
      totalStepsTakenByP2 += randomno

      $player2.appendTo(`#${totalStepsTakenByP2}`) 
      painOrPleasureP2()
      $circle.css('left', '25px') 

      if (randomno === 6) {
        currentPlayer = $player2
        $circle.css('left', '147px')
      } 
       else { 
        currentPlayer = $player1 
      }

    }

    else{

      currentPlayer = $player1
    }
   
 


  }


  function gameOver () {
    if (totalStepsTakenByP1 >= 100) {
      $('#100').append($player1) 
      alert("Player 1 won");
     autoPlayButtonreset()
      
    } else if (totalStepsTakenByP2 >= 100) {
        
       $('#100').append($player2) 
       alert("Player 2 won");
       autoPlayButtonreset()
       
           }


  }

  function resetButton () {

    window.location.reload("false")
    
  }

  

  function autoPlayButton () {
    clear = setInterval(player2Turn, 7000)
  }
  function autoPlayButtonreset () {
    clear = setInterval(resetButton, 2000)
  }

  function createTable () {
    var $tbl = $('#tbl')
    var id = 100
    var rowClass = 10
 
    for (var r = 0; r < 10; r++) {
      var $row = $('<tr>') 
      $row.attr('class', rowClass--) 

      for (var c = 0; c < 10; c++) {
        var $column = $('<td>') 
        $column.css({ 'width': '50px', 'height': '50px'})
        $column.attr('id', id--) 

        $column.attr('id') % 2 === 0 ? $column.css('backgroundColor', '#824f09') : $column.css('backgroundColor', 'white') 

        $row.each(function() {
          $(this).attr('class') % 2 === 0 ? $row.append($column) : $row.prepend($column)
        })
        $column.html(id + 1).addClass('cell')
      }
      $tbl.append($row)
    }
  }
  createTable()
  startPosition()
  

  // Using Array to input Snakes & Ladders
  var painAndPleasureArray = [0, 'ladder0', 0, 'ladder1', 0, 0, 'snake0', 0, 'ladder2', 0, 
    'snake1', 0, 'ladder3', 'ladder1', 0, 0, 'snake0', 'ladder0', 'snake3', 'ladder4', 
    0, 0, 0, 'snake5', 0, 0, 'ladder3', 'ladder5', 'snake1', 0, 
    'ladder2', 0, 0, 'snake2', 0, 0, 0, 'ladder4', 0, 'ladder6', 
    0, 0, 'snake4', 0, 0, 0, 0, 0, 0, 0,  
    'ladder7', 0, 0, 'snake2', 0, 0, 0, 0, 'ladder6', 0, 
    0, 'snake3', 'ladder8', 'snake4', 0, 0, 'ladder7', 0, 0, 0, 
    'ladder9', 0, 'snake6', 0, 'snake7', 0, 0, 'snake8', 0, 0, 
    'ladder8', 0, 0, 'ladder5', 0, 0, 'snake5', 0, 0, 0, 
    'ladder9', 0, 'snake6', 0, 'snake7', 0, 0, 0, 'snake8', 0] 
  function painOrPleasureP1 () {
    var currentP1Index = totalStepsTakenByP1 - 1
    painAndPleasureArray.forEach(function (element) {
  
      if (painAndPleasureArray[currentP1Index] === element && element.length === 7) {
        totalStepsTakenByP1 = (painAndPleasureArray.indexOf(element, painAndPleasureArray.indexOf(element) + 1)) + 1
        $player1.appendTo(`#${totalStepsTakenByP1}`)
        
      } else if (painAndPleasureArray[currentP1Index] === element && element.length === 6) {
        totalStepsTakenByP1 = (painAndPleasureArray.indexOf(element, painAndPleasureArray.indexOf(element) - 1)) + 1
        $player1.appendTo(`#${totalStepsTakenByP1}`)
      } else { return totalStepsTakenByP1 }
    })
  }


  function painOrPleasureP2 () {
    var currentP2Index = totalStepsTakenByP2 - 1
    painAndPleasureArray.forEach(function (element) {
      if (painAndPleasureArray[currentP2Index] === element && element.length === 7) {
        totalStepsTakenByP2 = (painAndPleasureArray.indexOf(element, painAndPleasureArray.indexOf(element) + 1)) + 1
        $player2.appendTo(`#${totalStepsTakenByP2}`)
      } else if (painAndPleasureArray[currentP2Index] === element && element.length === 6) {
        totalStepsTakenByP2 = (painAndPleasureArray.indexOf(element, painAndPleasureArray.indexOf(element) - 1)) + 1
        $player2.appendTo(`#${totalStepsTakenByP2}`)
      } else { return totalStepsTakenByP2 }
    })
  }
})
