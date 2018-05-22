var socket = io.connect('http://localhost:3000');
var camData = [];
var isTriggered = false;


var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Composites = Matter.Composites,
Common = Matter.Common,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
World = Matter.World,
Events = Matter.Events,
Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
world = engine.world;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: '#18e80d',
        showAngleIndicator: false,
        wireframes: false,
        enableSleeping: true
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var offset = 10, 
options = { 
    isStatic: true,
    render: {fillStyle: '#18e80d'}
};

world.bodies = [];
world.gravity.y = 1;

var d_static = Bodies.rectangle(100, 100, 64, 64, {restitution: 0.8, isStatic: true, render: {sprite: {texture: 'd.png'}}, angle: Math.PI * 0.10});
World.add(world, d_static);

var d_move = Bodies.rectangle(100, 100, 64, 64, {restitution: 0.8, isSleeping: true, render: {sprite: {texture: 'd.png'}}, angle: Math.PI * 0.10});
World.add(world, d_move);

var e_static = Bodies.rectangle(150, 100, 64, 64, {restitution: 0.2, isStatic: true, render: {sprite: {texture: 'e.png'}}, angle: -Math.PI * 0.15});
World.add(world, e_static);

var e_move = Bodies.rectangle(150, 100, 64, 64, {restitution: 0.2, isSleeping: true, render: {sprite: {texture: 'e.png'}}, angle: -Math.PI * 0.15});
World.add(world, e_move);

//rectangle: x, y, width, height, [options]
World.add(world, [
// Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
Bodies.rectangle(window.innerWidth/2, window.innerHeight - offset, window.innerWidth, 100, options), //bottom wall 
Bodies.rectangle(window.innerWidth, window.innerHeight/2, 10, window.innerHeight, options), //right wall
Bodies.rectangle(0, window.innerHeight/2, 10, window.innerHeight, options), //left wall
]);

var deck = [
//DECKxDESIGN
Bodies.rectangle(100, 100, 64, 64, {restitution: 0.2, render: {sprite: {texture: 'd.png'}}, angle: Math.PI * 0.10}),
Bodies.rectangle(150, 100, 64, 64, {restitution: 0.2, render: {sprite: {texture: 'e.png'}}, angle: -Math.PI * 0.15}),
Bodies.rectangle(240, 100, 64, 64, {restitution: 0.2, render: {sprite: {texture: 'c.png'}}, angle: Math.PI * 0.10}),
Bodies.rectangle(310, 100, 64, 64, {restitution: 0.2, render: {sprite: {texture: 'k.png'}}}),
Bodies.rectangle(370, 100, 64, 64, {restitution: 0.2, render: {sprite: {texture: 'd.png'}}, angle: Math.PI * 0.10}),
Bodies.rectangle(440, 100, 64, 64, {restitution: 0.2, render: {sprite: {texture: 'e.png'}}, angle: -Math.PI * 0.15}),
Bodies.rectangle(500, 100, 64, 64, {restitution: 0.2, render: {sprite: {texture: 's.png'}}}),
Bodies.rectangle(570, 100, 64, 64, {restitution: 0.2, render: {sprite: {texture: 'i.png'}}, angle: Math.PI * 0.10}),
Bodies.rectangle(640, 100, 64, 64, {restitution: 0.2, render: {sprite: {texture: 'g.png'}}, angle: -Math.PI * 0.15}),
Bodies.rectangle(710, 100, 64, 64, {restitution: 0.2, render: {sprite: {texture: 'n.png'}}, angle: Math.PI * 0.10}),

]

// World.add(world, deck);

socket.on('data', function (data) {
    camData = data;
    console.log(camData[11]);
    if (camData[11] && !isTriggered) {
        triggered(d_static,'d');
        isTriggered = true;
    }
});

function triggered(sample, anim, img) {
    World.remove(world, sample);
    anim.isSleeping = false;
    console.log(anim.isSleeping);
    setTimeout(function() {
        World.remove(world, anim);
        anim = Bodies.rectangle(100, 100, 64, 64, {restitution: 0.8, isSleeping: true, render: {sprite: {texture: img + '.png'}}, angle: Math.PI * 0.10});
        World.add(world, anim);
        console.log(anim);
        World.add(world, sample);
        isTriggered = false;
    }, 3000);
}

function triggered_e(sample, img) {
    World.remove(world, sample);
    e_move.isSleeping = false;
    setTimeout(function() {
        World.remove(world, e_move);
        e_move = Bodies.rectangle(150, 100, 64, 64, {restitution: 0.8, isSleeping: true, render: {sprite: {texture: img + '.png'}}, angle: -Math.PI * 0.15});
        World.add(world, e_move);
        console.log(e_move);
        World.add(world, sample);
        isTriggered = false;
    }, 3000);
}


// add mouse control
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: window.innerWidth, y: window.innerHeight }
});
