(function() {
    'use strict';

    angular.module('koappQuantity', []).directive('koappQuantity', koappQuantity);

    koappQuantity.$inject = [];
    function koappQuantity() {
        return {
            restrict: 'E',
            scope: true,
            replace: true,
            link: function(scope, element, attrs) {

                var incrementButton,
                    substractButton,
                    valueInput;

                function init() {
                    incrementButton = element.find('#increment-button');
                    substractButton = element.find('#substract-button');
                    valueInput = element.find('#qty-input');

                    valueInput[0].value = scope.item.quantity || 1;

                    substractButton.on('click', function(e) {
                        if (scope.item.quantity > 0)
                            scope.item.quantity--;
                        valueInput[0].value = scope.item.quantity || 1;
                        e.stopPropagation();
                    });

                    incrementButton.on('click', function(e) {
                        scope.item.quantity++;
                        valueInput[0].value = scope.item.quantity || 1;
                        e.stopPropagation();
                    });

                    scope.$watch('value', function() {
                        scope.item.quantity = parseInt(attrs.value);
                        valueInput.attr('value', attrs.value);
                    });
                }

                scope.$watch('value', function() {
                    scope.item.quantity = parseInt(attrs.value);
                    element.find('#qty-input').attr('value', attrs.value);
                    init();
                });

                var interval = setInterval(function() {
                    init();
                    clearInterval(interval);
                }, 10);
            },
            template: `
                    <div>
                      <style>
                      .qty {
                          display: flex;
                          position: relative;
                          width: 100%;
                        }
                        #qty-input {
                          text-align: center !important;
                          width: 100%;
                        }
                        #qty-input ::content {
                          padding: 0!important;
                        }

                        .qty #increment-button,
                        .qty #substract-button  {
                          min-width: 50px;
                          width: calc(100% / 3) !important;
                        }
                      </style>

                      <div class="qty">
                        <koa-button id="substract-button">-</koa-button>
                          <koa-input readonly id="qty-input"></koa-input>
                        <koa-button id="increment-button">+</paper-button>
                      </div>
                    </div>
                  `
        }
    }

})();
