products = [
    {name:"Astronaut",link:"https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"},
    {name:"Shoe", link:"https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb"},
    {name:"Duck", link:"https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/Duck/glTF-Binary/Duck.glb"},
    {name:"Robot", link:"https://modelviewer.dev/shared-assets/models/RobotExpressive.glb"},
    {name:"SpinningRobot", link:"https://modelviewer.dev/shared-assets/models/RobotExpressive.glb"},
    {name:"RunningRobot", link:"https://modelviewer.dev/shared-assets/models/RobotExpressive.glb"},
]

let body = null
let modelViewer = null;
let variantThemeDiv = null;
let variantColorOptions = null;

function openMenu(){
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav(){
    document.getElementById("mySidenav").style.width = "0px";
}

function changeProduct(name) {
    prod = products.find(item => item.name == name);
    modelViewer.src = prod.link;

    if(prod.name=="Shoe"){
        variantThemeDiv.removeAttribute("hidden");
        hiddeAllVariantColorOption();
    }
    else if(prod.name=="Robot"){
        modelViewer.setAttribute("auto-rotate","")
    }else if(prod.name=="SpinningRobot" || prod.name=="RunningRobot"){
        modelViewer.setAttribute("autoplay", "");

        if(prod.name=="RunningRobot"){
            modelViewer.setAttribute("animation-name", "Running");
            modelViewer.setAttribute("skybox-image", "https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr");
        }
    }else{
        modelViewer.removeAttribute("auto-rotate")
        modelViewer.removeAttribute("skybox-image");
        modelViewer.removeAttribute("animation-name");
        modelViewer.removeAttribute("autoplay");
        variantThemeDiv.setAttribute("hidden", "true");
        hiddeAllVariantColorOption(false);
    }

    closeNav();
}

function hiddeAllVariantColorOption(hidden=true){
    for(i=0; i < variantColorOptions.length; ++i){
        if(hidden){
            variantColorOptions[i].setAttribute("hidden", "true")
        }else{
            variantColorOptions[i].removeAttribute("hidden")
        }
    }
}

window.addEventListener("load", ()=> {

    modelViewer = document.getElementById("model");
    variantThemeDiv = document.getElementById("variant-div");
    variantColorOptions = document.getElementsByClassName("variant-color-option");
    
    // ----------
    // Code to add the measurement of item 
    const checkbox = modelViewer.querySelector('#show-dimensions');
    
    function setVisibility(element) {
        if (checkbox.checked) {
        element.classList.remove('hide');
        } else {
        element.classList.add('hide');
        }
    }
    
    checkbox.addEventListener('change', () => {
        setVisibility(modelViewer.querySelector('#dimLines'));
        modelViewer.querySelectorAll('button.dot').forEach((hotspot) => {
        setVisibility(hotspot);
        });

        modelViewer.querySelectorAll('button.dim').forEach((hotspot) => {
            setVisibility(hotspot);
        });
    });
    
    // update svg
    function drawLine(svgLine, dotHotspot1, dotHotspot2, dimensionHotspot) {
        if (dotHotspot1 && dotHotspot2) {
        svgLine.setAttribute('x1', dotHotspot1.canvasPosition.x);
        svgLine.setAttribute('y1', dotHotspot1.canvasPosition.y);
        svgLine.setAttribute('x2', dotHotspot2.canvasPosition.x);
        svgLine.setAttribute('y2', dotHotspot2.canvasPosition.y);
    
        // use provided optional hotspot to tie visibility of this svg line to
        if (dimensionHotspot && !dimensionHotspot.facingCamera) {
            svgLine.classList.add('hide');
        }
        else {
            svgLine.classList.remove('hide');
        }
        }
    }
    
    const dimLines = modelViewer.querySelectorAll('line');
    
    const renderSVG = () => {
        drawLine(dimLines[0], modelViewer.queryHotspot('hotspot-dot+X-Y+Z'), modelViewer.queryHotspot('hotspot-dot+X-Y-Z'), modelViewer.queryHotspot('hotspot-dim+X-Y'));
        drawLine(dimLines[1], modelViewer.queryHotspot('hotspot-dot+X-Y-Z'), modelViewer.queryHotspot('hotspot-dot+X+Y-Z'), modelViewer.queryHotspot('hotspot-dim+X-Z'));
        drawLine(dimLines[2], modelViewer.queryHotspot('hotspot-dot+X+Y-Z'), modelViewer.queryHotspot('hotspot-dot-X+Y-Z')); // always visible
        drawLine(dimLines[3], modelViewer.queryHotspot('hotspot-dot-X+Y-Z'), modelViewer.queryHotspot('hotspot-dot-X-Y-Z'), modelViewer.queryHotspot('hotspot-dim-X-Z'));
        drawLine(dimLines[4], modelViewer.queryHotspot('hotspot-dot-X-Y-Z'), modelViewer.queryHotspot('hotspot-dot-X-Y+Z'), modelViewer.queryHotspot('hotspot-dim-X-Y'));
    };
    
    modelViewer.addEventListener('camera-change', renderSVG);
    
    modelViewer.addEventListener('load', () => {
        const center = modelViewer.getBoundingBoxCenter();
        const size = modelViewer.getDimensions();
        const x2 = size.x / 2;
        const y2 = size.y / 2;
        const z2 = size.z / 2;
    
        modelViewer.updateHotspot({
        name: 'hotspot-dot+X-Y+Z',
        position: `${center.x + x2} ${center.y - y2} ${center.z + z2}`
        });
    
        modelViewer.updateHotspot({
        name: 'hotspot-dim+X-Y',
        position: `${center.x + x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim+X-Y"]').textContent =
            `${(size.z * 100).toFixed(0)} cm`;
    
        modelViewer.updateHotspot({
        name: 'hotspot-dot+X-Y-Z',
        position: `${center.x + x2} ${center.y - y2} ${center.z - z2}`
        });
    
        modelViewer.updateHotspot({
        name: 'hotspot-dim+X-Z',
        position: `${center.x + x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim+X-Z"]').textContent =
            `${(size.y * 100).toFixed(0)} cm`;
    
        modelViewer.updateHotspot({
        name: 'hotspot-dot+X+Y-Z',
        position: `${center.x + x2} ${center.y + y2} ${center.z - z2}`
        });
    
        modelViewer.updateHotspot({
        name: 'hotspot-dim+Y-Z',
        position: `${center.x} ${center.y + y2 * 1.1} ${center.z - z2 * 1.1}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim+Y-Z"]').textContent =
            `${(size.x * 100).toFixed(0)} cm`;
    
        modelViewer.updateHotspot({
        name: 'hotspot-dot-X+Y-Z',
        position: `${center.x - x2} ${center.y + y2} ${center.z - z2}`
        });
    
        modelViewer.updateHotspot({
        name: 'hotspot-dim-X-Z',
        position: `${center.x - x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim-X-Z"]').textContent =
            `${(size.y * 100).toFixed(0)} cm`;
    
        modelViewer.updateHotspot({
        name: 'hotspot-dot-X-Y-Z',
        position: `${center.x - x2} ${center.y - y2} ${center.z - z2}`
        });
    
        modelViewer.updateHotspot({
        name: 'hotspot-dim-X-Y',
        position: `${center.x - x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim-X-Y"]').textContent =
            `${(size.z * 100).toFixed(0)} cm`;
    
        modelViewer.updateHotspot({
        name: 'hotspot-dot-X-Y+Z',
        position: `${center.x - x2} ${center.y - y2} ${center.z + z2}`
        });
    
        renderSVG();
    });
    // End of code to add measurement of item

    // ----------
    // Code to modify the item color
    document.querySelector('#color-controls').addEventListener('click', (event) => {
      const colorString = event.target.value;
        const [material] = modelViewer.model.materials;
        material.pbrMetallicRoughness.setBaseColorFactor(colorString);
    });


    // -------
    // Code for the variant color theme of item
    let already_open_variant=false;
    const select_variant = document.querySelector('#variant');
    modelViewer.addEventListener('load', () => {
        
        if(already_open_variant){
            select_variant.innerHTML=''
        }

        const names = modelViewer.availableVariants;
        for (const name of names) {
          const option = document.createElement('option');
          option.value = name;
          option.textContent = name;
          select_variant.appendChild(option);
        }
        // Adds a default option.
        const option = document.createElement('option');
        option.value = 'default';
        option.textContent = 'Default';
        select_variant.appendChild(option);

        already_open_variant=true;
      });
      
      select_variant.addEventListener('input', (event) => {
        modelViewer.variantName = event.target.value === 'default' ? null : event.target.value;
    });
});