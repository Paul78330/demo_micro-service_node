$('#comment-form').on('submit', function(e) {
  e.preventDefault();
  
  var formDataArray = $(this).serializeArray();
  var formData = {};
  
  $.each(formDataArray, function(i, field) {
    formData[field.name] = field.value;
  });
  
  console.log('Form data: ', formData);
  
  $.ajax({
    url: '/comments',
    method: 'POST',
    data: JSON.stringify(formData),
    contentType: 'application/json',
    success: function() {
      // Fermer la modale
      $('#commentModal').modal('hide');

      // Recharger les commentaires ou faire autre chose
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // Gérer l'erreur
      console.error('Une erreur est survenue : ', textStatus, ', ', errorThrown);
    }
  });
});