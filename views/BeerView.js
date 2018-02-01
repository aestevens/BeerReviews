var BeerView = Backbone.View.extend({

  className: 'beer',

  template: Handlebars.compile($('#beer-template').html()),

  events: {
    'click .edit': 'makeEditable',
    'keypress input.beer-name': 'makeStatic',
    'click .remove': 'removeBeer'
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  },

  makeEditable: function () {
    // Hide our p element
    this.$('p').first().addClass('edit-mode');
    // Show our input with the beer name
    this.$('input').removeClass('edit-mode');
    // Focus on the input
    this.$('input').focus();
  },

  makeStatic: function (event) {
    // Only end editing if enter is pressed
    if (event.keyCode === 13) {
      var $value = this.$('input').val().trim();

      // Update the model with the new beer name
      this.model.set('name', $value);
      // Update the view with the new beer name
      this.$('p').first().html($value);
      // Remove editing capability by hiding the input
      this.$('p[class="beer-name edit-mode"]').removeClass('edit-mode');
      this.$('input').addClass('edit-mode');
    }
  },

  removeBeer: function () {
    // Remove the model of the beer
    this.model.destroy();
    this.$el.remove();

  }
});
