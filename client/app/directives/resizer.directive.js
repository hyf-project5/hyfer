import angular from 'angular';
import directivesModule from './directives.module';


resizer.$inject = ['$document'];

function resizer($document) {

    return {
        scope: {
            onResized: '&'
        },
        link: function (scope, element, attrs) {

            const parentElem = angular.element(element[0].parentElement);

            element.on('mousedown', function (event) {
                event.preventDefault();
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                let x = event.pageX;

                parentElem.css({
                    width: `${x}px`
                });
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
                let width =  parseInt(parentElem.css('width'), 10);
                scope.onResized({width});
            }
        }
    };
}

const directiveName = 'hyfResizer';

angular.module(directivesModule)
    .directive(directiveName, resizer);

export default directiveName;