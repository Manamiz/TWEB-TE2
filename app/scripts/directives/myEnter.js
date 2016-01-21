// Directive utilisée lorsque l'on souhaite appeler une fonction
//  lors de l'appui sur la touche Enter sur un élément
app.directive('myEnter', function() {
   return function(scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
         if(event.which === 13) {
            scope.$eval(attrs.myEnter);
            event.preventDefault();
         }
      });
   };
});