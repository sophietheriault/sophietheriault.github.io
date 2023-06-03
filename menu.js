products = [
    {name:"Astronaut",link:"https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"},
    {name:"Shoe", link:"https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb"},
    {name:"Duck", link:"https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/Duck/glTF-Binary/Duck.glb"},
]

function openMenu(){
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav(){
    document.getElementById("mySidenav").style.width = "0px";
}

function changeProduct(name) {
    prod = products.find(item => item.name == name);
    document.getElementById("model").src = prod.link;
    closeNav();
  }