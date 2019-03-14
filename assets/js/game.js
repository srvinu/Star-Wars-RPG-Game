


$(document).ready(function() {

  // var characters = [
  //   {"ID": "obi", "name": "Obi Wan", "health": "120", "attack": "8", "imageUrl": "assets/images/obi1.png", "enemyAttackBack": "15" },
  //   {"ID": "luke", "name": "Luke Skywalker", "health": "100", "attack": "14", "imageUrl": "assets/images/luke.png", "enemyAttackBack": "5" },
  //   {"ID": "darth", "name": "Darth Sidious", "health": "150", "attack": "8", "imageUrl": "assets/images/darth.jpg", "enemyAttackBack": "20" },
  //   {"ID": "maul", "name": "Darth Maul", "health": "180", "attack": "7", "imageUrl": "assets/images/maul.jpg", "enemyAttackBack": "20" }
  //  ];
  // console.log(characters);
//   $.each(characters, function(i, item) {
//     var initialImage=$('#initial');
//     var html= '<div class="w3-card-4" style="width:15%">' +
//               '<h2 class="w3-center">' + characters[i].name +'</h2>'+
//               '<img src="'+ characters[i].imageUrl+ '" id="img_'+ characters[i].ID +'" style="width:100%">'+
//               '<div class="w3-container w3-center">'+
//               '<p id="score_'+ characters[i].ID +'">' +characters[i].health+'</p>'
//               '</div> </div>';
//     initialImage.append(html);
//     console.log(characters[i].health);
//   });

  var characters = {
    'obi': {
      ID: 'obi',
      name: 'Obi-Wan',
      health: 120,
      attack: 8,
      imageUrl: 'assets/images/obi1.png',
      enemyAttackBack: 15
    },
    'luke': {
      ID: 'luke',
      name: 'Luke Skywalker',
      health: 100,
      attack: 14,
      imageUrl: 'assets/images/luke.png',
      enemyAttackBack: 5
    },
    'darth': {
      ID: 'darth',
      name: 'Darth Sidious',
      health: 150,
      attack: 8,
      imageUrl: 'assets/images/darth.jpg',
      enemyAttackBack: 20
    },
    'maul': {
      ID: 'maul',
      name: 'Darth Maul',
      health: 180,
      attack: 7,
      imageUrl: 'assets/images/maul.jpg',
      enemyAttackBack: 25
    }
  };

  var initialImage=$('#initial');
  var urSelect=$('#yourSelection');
  var oppAvail=$('#opponents');
  var defender=$('#defender');
  var playerName="";
  var playerhealth="";
  var defenderName="";
  var defenderHealth="";
  var attackCounter = 1;
  var enemyCounter = 3;
function initialCreate (char, id) {
  // var initialImage=$('#initial');

  var html= '<div class="w3-card-4 selectChar" id="'+ characters[char].ID +'" style="width:15%">' +
            '<h4 class="w3-center">' + characters[char].name +'</h4>'+
            '<img src="'+ characters[char].imageUrl+ '" id="img_'+ characters[char].ID +'" style="width:100%">'+
            '<div class="w3-container w3-center">'+
            '<p id="score_'+ characters[char].ID +'">' +characters[char].health+'</p>'
            '</div> </div>';
            // console.log(characters[char].name);
            // console.log(characters[char].imageUrl);
  id.append(html);
}
function initialAdd(){
  for (var i = 0; i < Object.keys(characters).length; i++){
    var char = Object.keys(characters)[i];
    initialCreate(char, initialImage);

  }
}
function yourAndOppSelect (yourSelect) {
  for (var i = 0; i < Object.keys(characters).length; i++) {
    var char = Object.keys(characters)[i];
    if (char != yourSelect) {
      initialCreate(char, oppAvail);
    }
    else {
      initialCreate(char, urSelect);
    }
  }
}
function restartGame() {
  location.reload();
}

initialAdd()
$('#initial').on('click', '.selectChar', function () {
  var selectedPlayer = this.id;
  playerName = this.id
  // hlt = '"score_"+selectedPlayer'
  playerhealth = $('#score_'+selectedPlayer).html();
  // console.log(playerhealth);
  // console.log(playerName);
  $("#cuchar").hide();
  $("#urC").show();
  $("#eAv").show();
  console.log("You have Selected : "+selectedPlayer);
  $('#initial').empty();
  yourAndOppSelect(selectedPlayer);

// yourAndOppSelect("obi")
});
  $('#opponents').on('click', '.selectChar', function () {
  var selectedEnemy = this.id;
  defenderName=this.id;
  defenderHealth=$('#score_'+selectedEnemy).html();
  // console.log(defenderName)
  // console.log(defenderHealth)
  // var selectEnID = $('#'+selectedEnemy)
  // $('.selectChar').not(this).each(function(){
  //   var restEnemy = this.id;
  //   if (restEnemy != "obi"){
  //     initialCreate(restEnemy, oppAvail)
  //   }
    $("#attackButton").show();
    $("#uDef").show();

    initialCreate(selectedEnemy, defender);
    $('#'+selectedEnemy).empty();
  // });
  });
  $('#attackButton').on('click.attactbtn', function () {
    // console.log("attack button press")
    // console.log("p-health --> "+playerhealth);
    // console.log("p-name--> "+playerName);
    // console.log("D-Name --> "+defenderName);
    // console.log("D-Health --> "+defenderHealth);
    // console.log("P-AttackBack-->"+characters[playerName].enemyAttackBack);
    // console.log("D-AttackBack-->"+characters[defenderName].enemyAttackBack);
    playerhealth = playerhealth - characters[defenderName].enemyAttackBack;
    defenderHealth = defenderHealth - characters[playerName].attack * attackCounter;
    $("#score_"+playerName).html(playerhealth);
    $("#score_"+defenderName).html(defenderHealth);
    if(playerhealth < 0){
      alert("You Lost the Game...Game will be restarted automatically")
      restartGame();
    }
    if (defenderHealth < 0) {
      $('#defender').empty();
      $("#uDef").hide();
      enemyCounter--;
      alert("Congragulations "+playerName+ " Defeated " +defenderName)
      if(enemyCounter == 0){
        alert("You Won ! Game will be restarted automatically")
        restartGame();
      }
    }
    attackCounter++;
  });



});
