import * as THREE from '../node_modules/three/src/Three.js';

const renderer = new THREE.WebGLRenderer({antialias: true})
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 500);

const crosshairx = window.innerWidth/2
const crosshairy = window.innerHeight/2
const crosshair = new THREE.Vector2(crosshairx, crosshairy);
const raycaster = new THREE.Raycaster();

let camx = 0
let camy = 0

const roomwidth = 50
const roomheight = 40
const roomdepth = 40


window.onload = function() {

    camera.position.z = 0

    renderer.setClearColor("#6DDDFE")
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    
    drawroom(roomwidth, roomheight, roomdepth)
    inittargets(15)
    addlight()
    
    document.body.onclick = onMouseClick
    document.onmousemove = handleMouseMove;

    render()

}

let render = function() {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
}

function onbodyclick(event) {
    document.body.requestPointerLock()
    console.log("hosch ofn body geckickt, ha?")
}

function handleMouseMove(event) {

    if(document.pointerLockElement == document.body) {
        if ((event.movementX < 0 && (camx - event.movementX / 1000) < 1.3) || (event.movementX > 0 && (camx - event.movementX / 1000) > -1.3)) {
            camx -= (event.movementX / 1000)
        }
        if ((event.movementY < 0 && (camy - event.movementY / 1000) < 1.3) || (event.movementY > 0 && (camy - event.movementY / 1000) > -1.3)) {
            camy -= (event.movementY / 1000)
        }
        
        //console.log("x= "+camx)
        //console.log("y= "+camy)
    } else {
        //console.log('pointer net gelockt!');
    }

    camera.rotation.y = camx
    camera.rotation.x = camy


}

function drawroom(width, height, depth) {

    //rechts
    for (let i = -5; i < 6; ++i) {
        let points = [];
        points.push( new THREE.Vector3( width/2, i*height/10, 20 ) );
        points.push( new THREE.Vector3( width/2, i*height/10, -depth ) );
        drawline(points)
    }
    

    //links
    for (let i = -5; i < 5; ++i) {
        let points = [];
        points.push( new THREE.Vector3( -width/2, i*height/10, 20 ) );
        points.push( new THREE.Vector3( -width/2, i*height/10, -depth ) );
        drawline(points)
    }

    //forne horizontal
    for (let i = -5; i < 6; ++i) {
        let points = [];
        points.push( new THREE.Vector3( width/2, i*height/10, -depth ) );
        points.push( new THREE.Vector3( -width/2, i*height/10, -depth ) );
        drawline(points)
    }

    //hinte
    for (let i = -5; i < 5; ++i) {
        let points = [];
        points.push( new THREE.Vector3( width/2, i*height/10, 20 ) );
        points.push( new THREE.Vector3( -width/2, i*height/10, 20 ) );
        drawline(points)
    }

    //unten
    for (let i = -5; i < 5; ++i) {
        let points = [];
        points.push( new THREE.Vector3( i*width/10, -height/2, 20 ) );
        points.push( new THREE.Vector3( i*width/10, -height/2, -depth ) );
        drawline(points)
    }

    //oben
    for (let i = -5; i < 5; ++i) {
        let points = [];
        points.push( new THREE.Vector3( i*width/10, height/2, 20 ) );
        points.push( new THREE.Vector3( i*width/10, height/2, -depth ) );
        drawline(points)
    }

    //forne vertikal
    for (let i = -5; i < 6; ++i) {
        let points = [];
        points.push( new THREE.Vector3( i*width/10, height/2, -depth ) );
        points.push( new THREE.Vector3( i*width/10, -height/2, -depth ) );
        drawline(points)
    }



}

function drawline(points) {

    const material = new THREE.LineBasicMaterial( { color: 0x7D00FF } );


    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const line = new THREE.Line( geometry, material );

    scene.add( line );

}

function inittargets(howmanny) {

    let geometry = new THREE.SphereGeometry(1, 100, 100)
    let material = new THREE.MeshLambertMaterial({color: "#E72D31"})

    for (let i = 0; i < howmanny; ++i) {
        let mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = ((Math.random() - 0.5) * 10000) % roomwidth/2;
        mesh.position.y = ((Math.random() - 0.5) * 10000) % roomheight/2;
        mesh.position.z = ((Math.random()) * -10000) % roomdepth;
        //console.log("pos1: "+mesh.position.z)
        if (mesh.position.z > -15) {
            mesh.position.z -= 15
        }
        //console.log("pos2: "+mesh.position.z)
        scene.add(mesh)
        //console.log(Math.random())
    }

}

function addlight() {
    let light = new THREE.PointLight(0xFFFFFF, 1, 1000)
    light.position.set(30, 0, 10)
    scene.add(light)

    light = new THREE.PointLight(0xFFFFFF, 1, 1000)
    light.position.set(-10, 0, 10)
    scene.add(light)
}

function onMouseClick(event) {

    document.body.requestPointerLock()

    event.preventDefault();

    raycaster.setFromCamera(crosshair, camera);

    let intersects = raycaster.intersectObjects(scene.children, true)

    console.log(intersects[0].object)

    //console.log(intersects)

    /*
    for (var i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color = {r: 0, g: 255, b: 0}
    }
    */
}