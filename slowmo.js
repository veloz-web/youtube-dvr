(function() {
  // Get the video element
  var video = document.querySelector('video');
  if (!video) {
    alert('No video found!');
    return;
  }
  
  // Get the control bar (YouTube's bottom chrome)
  var controlBar = document.querySelector('.ytp-chrome-bottom');
  if (!controlBar) {
    alert('Control bar not found!');
    return;
  }
  
  // Slow-motion toggle state (default: normal speed)
  var isSlowMo = false;
  
  // Create SVG for Slow Motion Button
  var createSlowMoSVG = function(isActive) {
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "ytp-button-icon");
    svg.setAttribute("height", "100%");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("viewBox", "0 0 36 36");
    svg.setAttribute("width", "100%");
    
    // Create background rounded rectangle
    var path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M11,11 C9.89,11 9,11.9 9,13 L9,23 C9,24.1 9.89,25 11,25 L25,25 C26.1,25 27,24.1 27,23 L27,13 C27,11.9 26.1,11 25,11 L11,11 Z");
    path.setAttribute("fill", "#fff");
    svg.appendChild(path);
    
    // Create text "0.5"
    var text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", "18");
    text.setAttribute("y", "21");
    text.setAttribute("font-family", "Arial, sans-serif");
    text.setAttribute("font-size", "8");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#000");
    text.setAttribute("font-weight", "bold");
    text.textContent = "0.5";
    svg.appendChild(text);
    
    // Add red underline for active state
    if (isActive) {
      var underline = document.createElementNS(svgNS, "rect");
      underline.setAttribute("x", "9");
      underline.setAttribute("y", "26");
      underline.setAttribute("width", "18");
      underline.setAttribute("height", "2");
      underline.setAttribute("fill", "#f00");
      svg.appendChild(underline);
    }
    
    return svg;
  };
  
  // Create SVG for Skip Back Button (based on provided refresh icon)
  var createSkipBackSVG = function() {
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "ytp-button-icon");
    svg.setAttribute("height", "100%");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("viewBox", "0 0 36 36");
    svg.setAttribute("width", "100%");
    
    // Create refresh-style path (scaled and centered in the 36x36 viewBox)
    var path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M9 9V14M9 14H14M9 14L12 11.2917C13.5923 9.86656 15.6949 9 18 9C22.9706 9 27 13.0294 27 18C27 22.9706 22.9706 27 18 27C13.7168 27 10.1325 24.008 9.22302 20");
    path.setAttribute("stroke", "#fff");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("fill", "none");
    svg.appendChild(path);
    
    // Create text "10"
    var text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", "18");
    text.setAttribute("y", "20");
    text.setAttribute("font-family", "Arial, sans-serif");
    text.setAttribute("font-size", "8");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#fff");
    text.setAttribute("font-weight", "bold");
    text.textContent = "10";
    svg.appendChild(text);
    
    return svg;
  };
  
  // Create SVG for Skip Forward Button (horizontally flipped refresh icon)
  var createSkipForwardSVG = function() {
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "ytp-button-icon");
    svg.setAttribute("height", "100%");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("viewBox", "0 0 36 36");
    svg.setAttribute("width", "100%");
    
    // Create flipped refresh-style path
    var path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M27 9V14M27 14H22M27 14L24 11.2917C22.4077 9.86656 20.3051 9 18 9C13.0294 9 9 13.0294 9 18C9 22.9706 13.0294 27 18 27C22.2832 27 25.8675 24.008 26.777 20");
    path.setAttribute("stroke", "#fff");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("fill", "none");
    svg.appendChild(path);
    
    // Create text "10"
    var text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", "18");
    text.setAttribute("y", "20");
    text.setAttribute("font-family", "Arial, sans-serif");
    text.setAttribute("font-size", "8");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#fff");
    text.setAttribute("font-weight", "bold");
    text.textContent = "10";
    svg.appendChild(text);
    
    return svg;
  };
  
  // Create Slow-Mo Toggle Button
  var slowMoButton = document.createElement('button');
  slowMoButton.className = 'ytp-button';
  slowMoButton.title = 'Toggle Slow Motion (0.5x)';
  slowMoButton.appendChild(createSlowMoSVG(false));
  
  slowMoButton.onclick = function() {
    isSlowMo = !isSlowMo;
    video.playbackRate = isSlowMo ? 0.5 : 1;
    
    // Fix for CSP: remove old SVG and append new one instead of using innerHTML
    while (slowMoButton.firstChild) {
      slowMoButton.removeChild(slowMoButton.firstChild);
    }
    slowMoButton.appendChild(createSlowMoSVG(isSlowMo));
  };
  
  // Create Skip Back 10s Button
  var skipBackButton = document.createElement('button');
  skipBackButton.className = 'ytp-button';
  skipBackButton.title = 'Skip back 10 seconds';
  skipBackButton.appendChild(createSkipBackSVG());
  
  skipBackButton.onclick = function() {
    video.currentTime = Math.max(0, video.currentTime - 10);
  };
  
  // Create Skip Forward 10s Button
  var skipForwardButton = document.createElement('button');
  skipForwardButton.className = 'ytp-button';
  skipForwardButton.title = 'Skip forward 10 seconds';
  skipForwardButton.appendChild(createSkipForwardSVG());
  
  skipForwardButton.onclick = function() {
    video.currentTime = video.currentTime + 10;
  };
  
  // Inject buttons into the control bar (inside the right controls area)
  var rightControls = controlBar.querySelector('.ytp-right-controls');
  if (rightControls) {
    // Order: Skip Back, Slow Mo, Skip Forward
    rightControls.insertBefore(skipForwardButton, rightControls.firstChild);
    rightControls.insertBefore(slowMoButton, rightControls.firstChild);
    rightControls.insertBefore(skipBackButton, rightControls.firstChild);
  } else {
    // Fallback: append to control bar if right controls not found
    controlBar.appendChild(skipBackButton);
    controlBar.appendChild(slowMoButton);
    controlBar.appendChild(skipForwardButton);
  }
})();
