//= ../../bower_components/jquery/jquery.min.js
//= ../../bower_components/handlebars/handlebars.min.js
//= jquery.xdomainrequest.min.js

(function() {
	var app = {
		vars: {
			results: {}
		},
		init: function() {
			app.getUsers();
		},
		getUsers: function() {
			var results;
			$.ajax({
				url: 'http://api.randomuser.me/?results=11&nat=en',
				method: 'get', 
				success: function(data) {
				 	app._drawUsers(data.results);
				 	app.vars.results = data.results;
				},
				dataType: "json"
			});
			 
		},
		// Вставляет список пользвателей
		_drawUsers: function(users) {
			var source = $('#user-template').html();
			var template = Handlebars.compile(source);
			var templateComplete = "";
			$(users).each(function(index) {
				var user = this.user;
				user.id = index; // индекс эл-та
				user.id_inc = index + 1; // индекс для списка
				// Заглавные буквы старт
				user.name.first = app._uCFirst(user.name.first);
				user.name.last = app._uCFirst(user.name.last);
				user.location.state = app._uCFirst(user.location.state);
				user.location.city = app._uCFirst(user.location.city);
				user.location.street = app._uCFirst(user.location.street);
				templateComplete += template(user);
			});
			$('.table tr').after(templateComplete);
			app._eventListeners();
		},
		
		_eventListeners: function() {
			$('.btnModal').click(function() {
				var id = $(this).data('id');
				app._showInfo(id);
			});
		},
		// Вставляет пользователя в окошко
		_showInfo: function(id) {
				console.log(app.vars.results[id]);
			var source = $('#modal-template').html();
			var template = Handlebars.compile(source);
			var templateComplete = "";
			var user = app.vars.results[id].user;
			templateComplete += template(user);
			$('#modalUser .modal-content').html(templateComplete);
		},
		// первая бува заглавная
		_uCFirst: function(str) {
			  if (!str) return str;
			  return str[0].toUpperCase() + str.slice(1);
		}
	}
	app.init();
})();