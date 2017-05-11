import angular from 'angular'
import directivesModule from './directives.module'

resizer.$inject = ['$document', '$rootScope']

function resizer($document, $rootScope) {
  return {
    scope: {
      unitWidth: '<',
      onResized: '&'
    },
    link: function (scope, element /*, attrs*/) {
      const parentElem = angular.element(element[0].parentElement)

      element.on('mousedown', function (event) {
        event.preventDefault()
        $document.on('mousemove', mousemove)
        $document.on('mouseup', mouseup)
      })

      function mousemove(event) {
        const parentLeft = getOffset(parentElem[0]).left
        const x = event.pageX - parentLeft
        parentElem.css({
          width: `${x}px`
        })
      }

      function mouseup() {
        $document.unbind('mousemove', mousemove)
        $document.unbind('mouseup', mouseup)
        const draggedWidth = parseInt(parentElem.css('width'), 10)
        const width = Math.round(draggedWidth / scope.unitWidth) * scope.unitWidth
        parentElem.css('width', `${width}px`)
        scope.onResized({ width })
        $rootScope.$digest()
      }

      function getOffset(elem) {
        let left = 0
        let top = 0
        while (elem && !isNaN(elem.offsetLeft) && !isNaN(elem.offsetTop)) {
          left += elem.offsetLeft - elem.scrollLeft
          top += elem.offsetTop - elem.scrollTop
          elem = elem.offsetParent
        }
        return { top, left }
      }
    }
  }
}

const directiveName = 'hyfResizer'

angular.module(directivesModule)
  .directive(directiveName, resizer)

export default directiveName
