function login() {
  var mydata = JSON.parse(data);
  console.log(mydata); 
  var pseudo = document.getElementById("pseudo").value;
  var password = document.getElementById("password").value;
  checkAccount(pseudo, password, mydata);
}

function loginGuest() {    
  var guest = document.getElementById("guest").value;
  enter(guest);
}

function enter(pseudo) {
  localStorage.setItem('pseudo', pseudo);
  window.location.href = './accueil.html';
}

function checkAccount(pseudo, password, myData) {
  // Vérification paire pseudo-mdp
  var dataResult = myData.some(function(userObject) {
    for (var username in userObject) {
      if (username === pseudo && userObject[username] === password) {
        return true;
      }
    }
    return false;
  });

  if (dataResult) {
    console.log('Pseudo et mdp corrects');
    enter(pseudo);
  } else {
    console.log('Pseudo et mdp incorrect');
    alert('Pseudo ou mot de passe incorrect.');
  }
}

/*const fs = require('fs');

function addAccount(pseudo, password, filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur de lecture du fichier JSON:', err);
      return;
    }

    let dataArray = JSON.parse(data);
    const existingUser = dataArray.find(userObject => userObject[pseudo] !== undefined);

    if (!existingUser) {
      const newUserObject = {};
      newUserObject[pseudo] = password;
      dataArray.push(newUserObject);

      const newData = JSON.stringify(dataArray, null, 2); // La dernière option (2) pour la mise en forme lisible

      // Écrire la nouvelle chaîne dans le fichier JSON
      fs.writeFile(filePath, newData, 'utf8', (err) => {
        if (err) {
          console.error('Erreur d\'écriture dans le fichier JSON:', err);
          return;
        }
        console.log('Nouvel utilisateur ajouté avec succès.');
      });
    } else {
      console.log('L\'utilisateur existe déjà.');
    }
  });
}*/




