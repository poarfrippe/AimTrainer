import * as THREE from '../node_modules/three/src/Three.js';

const renderer = new THREE.WebGLRenderer({antialias: true})
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 500);

let camx = 0
let camy = 0
let camz = 0
let anglex = 0
let angley = 0

const roomwidth = 50
const roomheight = 40
const roomdepth = 40
const roomhintercam = 20

const wholeround = 2*Math.PI

//sensi zwischen 0 und 2!!
const sensiy = 1.2
const sensix = 1.2

const numberNotTargetElements = 11

let scoreMash
let score = 0
let timeMash
let time = 10

let currentDate
let startsec = -1
let currentsec

window.onload = function() {

    camera.position.z = 0

    renderer.setClearColor("#6DDDFE")
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    
    drawroom(roomwidth, roomheight, roomdepth)
    settextscore("Score: " + score)
    settime("" +time)
    inittargets(1)
    addlight()
    
    document.body.onclick = onMouseClick
    document.onmousemove = handleMouseMove;

    render()

}

let render = function() {

    currentDate = new Date();
    if (currentsec!=currentDate.getSeconds() && startsec > 0){
        currentsec = currentDate.getSeconds()
        --time
        settime("" +time)

        if (time == 0) {
            sendScore()
            startsec = -2
            camera.lookAt(0, 0, -1)
            document.exitPointerLock();
        }
    }

    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

function sendScore() {
    console.log("iatz war zu senden an backend Score: " + score)
}

function settextscore(text) {

    scene.remove(scoreMash)

    let material = new THREE.MeshLambertMaterial({
        color: "#FFFFFF"
    })

    let loader = new THREE.FontLoader();
    loader.load( 'Helvetica.json', function ( font ) {
        let textgeo = new THREE.TextGeometry(text, {
            font: font,
            size: 2,
            height: 0.01,
            curveSegments: 30,
            bevelThickness: 0.1,
			bevelSize: 0.1,
			bevelEnabled: true
        })

        textgeo.computeBoundingBox();

        scoreMash = new THREE.Mesh(textgeo, material)
        scoreMash.position.z = -roomdepth
        scoreMash.position.x = -roomwidth/2
        scoreMash.position.y = roomheight/2 -2

        scene.add(scoreMash)
    })

}

function settime (time) {

    scene.remove(timeMash)

    let material = new THREE.MeshLambertMaterial({
        color: "#FFFFFF",
    })

    let loader = new THREE.FontLoader();
    loader.load( 'Helvetica.json', function ( font ) {
        let textgeo = new THREE.TextGeometry(time, {
            font: font,
            size: 2,
            height: 0.5,
            curveSegments: 30,
            bevelThickness: 0.1,
			bevelSize: 0.1,
			bevelEnabled: true
        })

        textgeo.computeBoundingBox();

        timeMash = new THREE.Mesh(textgeo, material)
        timeMash.position.z = -roomdepth
        timeMash.position.x = roomwidth/2 -4
        timeMash.position.y = roomheight/2 -2

        scene.add(timeMash)
    })
}

function handleMouseMove(event) {

    if(document.pointerLockElement == document.body && startsec > 0) {
        
        let obweiter = true
        if (camy > 0.98 && camz < 0.02 && event.movementY >= 0){
            obweiter = false
        } else {
            obweiter = true
        }

        //console.log("obweiter: " + obweiter)

        if (obweiter) {
            if(anglex > wholeround){
                anglex = 0
            } else if(anglex < 0) {
                anglex = wholeround
            }

            if(angley > wholeround){
                angley = 0
            } else if(angley < 0) {
                angley = wholeround
            }

            anglex += event.movementX / ((2 - sensix) * 1000)
            angley += event.movementY / ((2 - sensiy) * 1000)

            //(console.log(event.movementY)
            
            //soll Eine Sphere um (0,0,0) darstellen wo je nach x winkel und y winkel der x, y, und z punkt ausgerechnt wird wo die kamera hinsehen soll!!!!
            camx = getgegenkathete(anglex)
            camy = getgegenkathete(angley)
            let sepp = getankathete(angley)                 //ist dazu da dass z bei bewegungen entlang der y achse nicht gleich bleibt
            camz = getgegenkathete(wholeround/4-anglex, sepp) 
        }
        
        camera.lookAt(camx, -camy, -camz)
    } else {
        //console.log('pointer net gelockt!');
    }

}

function getgegenkathete(angle, hyplenght = 1) {
    return Math.sin(angle)*hyplenght
}

function getankathete(angle, hyplenght = 1) {
    return Math.cos(angle)*hyplenght
}

function drawroom(width, height, depth) {

/*
    //rechts
    for (let i = -5; i < 6; ++i) {
        let points = [];
        points.push( new THREE.Vector3( width/2, i*height/10, roomhintercam ) );
        points.push( new THREE.Vector3( width/2, i*height/10, -depth ) );
        drawline(points)
    }
    

    //links
    for (let i = -5; i < 5; ++i) {
        let points = [];
        points.push( new THREE.Vector3( -width/2, i*height/10, roomhintercam ) );
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
        points.push( new THREE.Vector3( width/2, i*height/10, roomhintercam ) );
        points.push( new THREE.Vector3( -width/2, i*height/10, roomhintercam ) );
        drawline(points)
    }

    //unten
    for (let i = -5; i < 5; ++i) {
        let points = [];
        points.push( new THREE.Vector3( i*width/10, -height/2, roomhintercam ) );
        points.push( new THREE.Vector3( i*width/10, -height/2, -depth ) );
        drawline(points)
    }

    //oben
    for (let i = -5; i < 5; ++i) {
        let points = [];
        points.push( new THREE.Vector3( i*width/10, height/2, roomhintercam ) );
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
*/

    let textureloader = new THREE.TextureLoader()
/*
    let walltexture = new textureloader.load("textures/Tiles084/Tiles084_1K_Color.jpg")
    let wallbumpMap = new textureloader.load("textures/Tiles084/Tiles084_1K_AmbientOcclusion.jpg")
    let wallnormalMap = new textureloader.load("textures/Tiles084/Tiles084_1K_Normal.jpg")
*/
  
    let walltexture = new textureloader.load("Tiles084_1K_Color.jpg")
    let wallbumpMap = new textureloader.load("Tiles084_1K_AmbientOcclusion.jpg")
    let wallnormalMap = new textureloader.load("Tiles084_1K_Normal.jpg")


    let material = new THREE.MeshPhongMaterial({
        //color: 0x7dc0ff,
        color: 0x616161,
        map: walltexture,
        bumpMap: wallbumpMap,
        normalMap: wallnormalMap
    })
    let geometry
    let mesh

    //wand rechts
    geometry = new THREE.BoxGeometry(1, roomheight+1, roomdepth+roomhintercam+2)
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = roomwidth/2+1
    mesh.position.y = 0
    mesh.position.z = -roomdepth+((roomdepth+roomhintercam)/2)
    scene.add(mesh)

    //wand links
    geometry = new THREE.BoxGeometry(1, roomheight+1, roomdepth+roomhintercam+2)
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = -roomwidth/2-1
    mesh.position.y = 0
    mesh.position.z = -roomdepth+((roomdepth+roomhintercam)/2)
    scene.add(mesh)

    //wand forne
    geometry = new THREE.BoxGeometry(roomwidth+1, roomheight+1, 1)  //jo isch schun gessepplt also sepp... i muas fortniten...
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = 0
    mesh.position.y = 0
    mesh.position.z = -roomdepth-1
    scene.add(mesh)

    //wand hinten
    geometry = new THREE.BoxGeometry(roomwidth+1, roomheight+1, 1)  //jo isch schun gessepplt also sepp... i muas fortniten...
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = 0
    mesh.position.y = 0
    mesh.position.z = roomhintercam+1
    scene.add(mesh)

    //boden
    geometry = new THREE.BoxGeometry(roomwidth+1, 1, roomdepth+roomhintercam+2)  //jo isch schun gessepplt also sepp... i muas fortniten...
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = 0
    mesh.position.y = -(roomheight/2)-1
    mesh.position.z = -roomdepth+((roomdepth+roomhintercam)/2)
    scene.add(mesh)

    //decke
    geometry = new THREE.BoxGeometry(roomwidth+1, 1, roomdepth+roomhintercam+2)  //jo isch schun gessepplt also sepp... i muas fortniten...
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = 0
    mesh.position.y = +(roomheight/2)+1
    mesh.position.z = -roomdepth+((roomdepth+roomhintercam)/2)
    scene.add(mesh)

}

function drawline(points) {
    const material = new THREE.LineBasicMaterial( { 
        //color: 0x7D00FF
        color: 0x000000
    } );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    scene.add( line );
}

function inittargets(howmanny) {

    let geometry = new THREE.SphereGeometry(1, 100, 100)
    let material = new THREE.MeshLambertMaterial({
        color: "#FFFFFF",
        //map: new THREE.TextureLoader().load("textures/joni.png")
        map: new THREE.TextureLoader().load("joni.png")
        //map: new THREE.TextureLoader().load("theo.png")
    })

    for (let i = 0; i < howmanny; ++i) {
        let mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = ((Math.random() - 0.5) * 10000) % roomwidth/2;
        mesh.position.y = ((Math.random() - 0.5) * 10000) % roomheight/2;
        mesh.position.z = ((Math.random()) * -10000) % roomdepth;
        if (mesh.position.z > -15) {
            mesh.position.z -= 15
        }
        //mesh.receiveShadow = true
        scene.add(mesh)
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

    if (startsec != -2) {
        document.body.requestPointerLock()
    }
    
    event.preventDefault();

    if (startsec == -1) {
        starttimer(time)
    }

    let newcords = new THREE.Vector3(0, 0, 0)
    for(let i = 0; i < scene.children.length; ++i) {
        if(scene.children[i].type == "Mesh") {
            if (scene.children[i].geometry.type == "SphereGeometry") {
                newcords = getcordsontargethight(scene.children[i].position)
                if ((newcords.x < scene.children[i].position.x+1 && newcords.x > scene.children[i].position.x-1) && 
                    (newcords.y < scene.children[i].position.y+1 && newcords.y > scene.children[i].position.y-1)) {
                        if (startsec > 0) {
                            ++score
                            settextscore("Score: " + score)
                            scene.remove(scene.children[i])
                        }
                }
            }
        }
    }

    if (scene.children.length < numberNotTargetElements) {
        inittargets(1)
    }

}

function getcordsontargethight(target) {
    let newx = (camx/camz) * -target.z
    let newy = (camy/camz) * target.z

    return new THREE.Vector3(newx, newy, target.z)
}

function starttimer(sekunden) {
    currentDate = new Date();
    startsec = currentDate.getSeconds()
    currentsec = startsec
    time = sekunden
}