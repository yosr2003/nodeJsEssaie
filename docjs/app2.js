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


  function toggleFavorite(icon) {
    icon.classList.toggle('filled');
    if (icon.classList.contains('filled')) {
      icon.classList.replace('fa-regular', 'fa-solid');
    } else {
      icon.classList.replace('fa-solid', 'fa-regular');
    }
  }