import angular from 'angular';
import directivesModule from './directives.module';


resizer.$inject = ['$document', '$rootScope'];

function resizer($document, $rootScope) {

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
                const parentLeft = getOffset(parentElem[0]).left;
                let x = event.pageX - parentLeft;
                parentElem.css({
                    width: `${x}px`
                });
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
                let width = parseInt(parentElem.css('width'), 10);
                scope.onResized({ width });
                setTimeout(() => $rootScope.$digest(), 100);
            }

            function getOffset(el) {
                var _x = 0;
                var _y = 0;
                while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                    _x += el.offsetLeft - el.scrollLeft;
                    _y += el.offsetTop - el.scrollTop;
                    el = el.offsetParent;
                }
                return { top: _y, left: _x };
            }
        }
    };
}

const directiveName = 'hyfResizer';

angular.module(directivesModule)
    .directive(directiveName, resizer);

export default directiveName;