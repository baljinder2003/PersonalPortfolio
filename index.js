//open-close
function toggleclose(target) {
    document.getElementById(target).classList.toggle("ZSize")
  }
  //top bar and z-index
  const icons = {
    minimise: "-",
    rectangle: '&#x25A1;',
    cross: "☣",
  };
  var x = 60, y = 0;
  const elements = document.querySelectorAll('.windows');
  elements.forEach(function (element) {
    if (y < parseInt(window.getComputedStyle(document.getElementsByTagName("body")[0]).width)) {
      element.style.left = y + "px";
      element.style.top = x + "px";
      y += parseInt(window.getComputedStyle(element).width);
    }
    else {
      y = 0; element.style.left = y + "px";
      x += 50; element.style.top = x + "px";
    }
    const container = document.createElement('div');
    const crossButton = document.createElement('button');
    const rectangleButton = document.createElement('button');
    const minimiseButton = document.createElement('button');

    container.classList.add("xxxcontainerxxx");
    crossButton.classList.add("xxxcrossButtonxxx");
    rectangleButton.classList.add("xxxrectangleButtonxxx");
    minimiseButton.classList.add("xxxminimiseButtonxxx")

    container.innerHTML = "";
    crossButton.innerHTML = icons.cross;
    rectangleButton.innerHTML = icons.rectangle;
    minimiseButton.innerHTML = icons.minimise;

    crossButton.addEventListener('click', function () { element.classList.toggle('ZSize'); });
    rectangleButton.addEventListener('click', function () { element.classList.toggle('FSize'); });
    minimiseButton.addEventListener('click', function () { element.classList.toggle('ZSize') })

    container.appendChild(crossButton);
    container.appendChild(rectangleButton);
    container.appendChild(minimiseButton);
    element.insertBefore(container, element.firstChild);
    elements.forEach(element => {
        element.addEventListener('click', () => {
            elements.forEach(el => el.style.zIndex = 'unset'); // Reset z-index for all elements
            element.style.zIndex = '1'; // Set z-index of the clicked element to 1
        });
    });
    element.classList.toggle('ZSize')
  });
  //drag
  document.querySelectorAll('.drag').forEach(elmnt => {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }

  });