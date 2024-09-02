function profil(pseudo) {
  if (pseudo) {
    document.getElementById('pseudoPlace').innerText = pseudo;
  } else {
    window.location.href = 'connexion.html';
  }
}

function logout(){
  localStorage.removeItem('pseudo');
  window.location.href = 'connexion.html';
}