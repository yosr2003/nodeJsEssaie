document.addEventListener('DOMContentLoaded', function() {
    const updateButton = document.getElementById('updateButton');
    const submitButton = document.getElementById('submitButton');
    const formElements = document.querySelectorAll('#profileForm input');
    
    updateButton.addEventListener('click', function() {
      const isDisabled = formElements[0].disabled;
      
      if (isDisabled) {
        formElements.forEach(input => input.disabled = false);
        updateButton.style.display = 'none';
        confirmButton.style.display = 'inline-block';
      } else {
        updateButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
        formElements.forEach(input => input.disabled = true);
      }
    });

    
  });

  function voter(candidatId, userId) {
    
    fetch('/voteCandidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ candidatId, userId })
    })
    .then(response => {
      if (response.redirected) {
          window.location.href = response.url;
      } else {
          console.error('Voting failed or no redirect response');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
    console.log(candidatId, userId);
  }


  function toggleFavorite(icon, candidatId, userId) {
    // Toggle the "filled" state
    const isFilled = icon.classList.toggle('filled');
  
    // Update the icon's class based on the state
    if (isFilled) {
      // If filled, show the solid version
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    } else {
      // If not filled, show the regular version
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    }
    fetch('/toggleFavorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ candidatId, userId })
    })
    .then(response => {
      if (response.redirected) {
          window.location.href = response.url;
      } else {
          console.error('favorite failed or no redirect response');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
    console.log(candidatId, userId);
  }
  
  