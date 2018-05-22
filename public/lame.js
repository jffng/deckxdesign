var socket = io.connect('http://localhost:1234/');
var camData = [];
var d_isTriggered = false;
var e_isTriggered = false;
var c_isTriggered = false;
var k_isTriggered = false;
var dd_isTriggered = false;
var ee_isTriggered = false;
var s_isTriggered = false;
var i_isTriggered = false;
var g_isTriggered = false;
var n_isTriggered = false;


var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Composites = Matter.Composites,
Common = Matter.Common,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
World = Matter.World,
Events = Matter.Events,
Bodies = Matter.Bodies,
Body = Matter.Body;

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
        background: '#45F933',
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
    render: {fillStyle: '#45F933'}
};

world.bodies = [];
world.gravity.y = 1;

var d_static = Bodies.rectangle(100, 200, 64, 64, {isStatic: true, render: {sprite: {texture: 'd.png'}}, angle: Math.PI * 0.10});
World.add(world, d_static);

var d_move = Bodies.rectangle(100, 200, 64, 64, {restitution: 0.8, isSleeping: true, render: {sprite: {texture: 'd.png'}}, angle: Math.PI * 0.10});
World.add(world, d_move);

var e_static = Bodies.rectangle(200, 200, 64, 64, {isStatic: true, render: {sprite: {texture: 'e.png'}}, angle: -Math.PI * 0.05});
World.add(world, e_static);

var e_move = Bodies.rectangle(200, 200, 64, 64, {restitution: 0.8, isSleeping: true, render: {sprite: {texture: 'e.png'}}, angle: -Math.PI * 0.05});
World.add(world, e_move);

var c_static = Bodies.rectangle(300, 200, 64, 64, {isStatic: true, render: {sprite: {texture: 'c.png'}}, angle: Math.PI * 0.05});
World.add(world, c_static);

var c_move = Bodies.rectangle(300, 200, 64, 64, {restitution: 0.8, isSleeping: true, render: {sprite: {texture: 'c.png'}}, angle: Math.PI * 0.05});
World.add(world, c_move);

var k_static = Bodies.rectangle(400, 200, 64, 64, {isStatic: true, render: {sprite: {texture: 'k.png'}}, angle: Math.PI * 0.01});
World.add(world, k_static);

var k_move = Bodies.rectangle(400, 200, 64, 64, {restitution: 0.8, isSleeping: true, render: {sprite: {texture: 'k.png'}}, angle: Math.PI * 0.01});
World.add(world, k_move);

var dd_static = Bodies.rectangle(600, 200, 64, 64, {isStatic: true, render: {sprite: {texture: 'd.png'}}, angle: -Math.PI * 0.01});
World.add(world, dd_static);

var dd_move = Bodies.rectangle(600, 200, 64, 64, {restitution: 0.8, isSleeping: true, render: {sprite: {texture: 'd.png'}}, angle: -Math.PI * 0.01});
World.add(world, dd_move);

var ee_static = Bodies.rectangle(700, 200, 64, 64, {isStatic: true, render: {sprite: {texture: 'e.png'}}, angle: -Math.PI * 0.01});
World.add(world, ee_static);

var ee_move = Bodies.rectangle(700, 200, 64, 64, {restitution: 0.8, isSleeping: true, render: {sprite: {texture: 'e.png'}}, angle: -Math.PI * 0.01});
World.add(world, ee_move);

var s_static = Bodies.rectangle(800, 200, 64, 64, {isStatic: true, render: {sprite: {texture: 's.png'}}, angle: -Math.PI * 0.1});
World.add(world, s_static);

var s_move = Bodies.rectangle(800, 200, 64, 64, {restitution: 0.8, isSleeping: true, render: {sprite: {texture: 's.png'}}, angle: -Math.PI * 0.1});
World.add(world, s_move);

var i_static = Bodies.rectangle(870, 200, 64, 64, {isStatic: true, render: {sprite: {texture: 'i.png'}}, angle: Math.PI * 0.01});
World.add(world, i_static);

var i_move = Bodies.rectangle(870, 200, 64, 64, {restitution: 0.8, isSleeping: true, render: {sprite: {texture: 'i.png'}}, angle: Math.PI * 0.01});
World.add(world, i_move);

var g_static = Bodies.rectangle(950, 200, 64, 64, {isStatic: true, render: {sprite: {texture: 'g.png'}}, angle: Math.PI * 0.01});
World.add(world, g_static);

var g_move = Bodies.rectangle(950, 200, 64, 64, {restitution: 0.8, isSleeping: true, render: {sprite: {texture: 'g.png'}}, angle: Math.PI * 0.01});
World.add(world, g_move);

var n_static = Bodies.rectangle(2050, 200, 64, 64, {isStatic: true, render: {sprite: {texture: 'n.png'}}, angle: Math.PI * 0.1});
World.add(world, n_static);

var n_move = Bodies.rectangle(2050, 200, 64, 64, {restitution: 0.8, isSleeping: true, render: {sprite: {texture: 'n.png'}}, angle: Math.PI * 0.1});
World.add(world, n_move);

//rectangle: x, y, width, height, [options]
World.add(world, [
// Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
Bodies.rectangle(window.innerWidth/2, window.innerHeight - offset, window.innerWidth, 100, options), //bottom wall 
Bodies.rectangle(window.innerWidth, window.innerHeight/2, 10, window.innerHeight, options), //right wall
Bodies.rectangle(0, window.innerHeight/2, 10, window.innerHeight, options), //left wall
]);

var x = [
            Bodies.rectangle(500, window.innerHeight-150, 50, 600, {isStatic: true, render: {fillStyle: '#ffffff'}, angle: Math.PI * 0.25}),
            Bodies.rectangle(500, window.innerHeight-150, 50, 600, {isStatic: true, render: {fillStyle: '#ffffff'}, angle: -Math.PI * 0.25})
        ]

World.add(world, x);

socket.on('data', function (data) {
    camData = data;
    console.log(camData);
    // console.log('10:' + camData[10]);
    // console.log('9:' + camData[9]);
    if (camData[11] && !d_isTriggered) {
        d_isTriggered = true;
        triggered(d_static, d_move);
    }
    else if (camData[10] && !e_isTriggered) {
        e_isTriggered = true;
        triggered(e_static, e_move);
    }
    else if (camData[9] && !c_isTriggered) {
        c_isTriggered = true;
        triggered(c_static, c_move);
    }
    else if (camData[8] && !k_isTriggered) {
        k_isTriggered = true;
        triggered(k_static, k_move);
    }
    else if (camData[7] && !dd_isTriggered) {
        dd_isTriggered = true;
        triggered(dd_static, dd_move);
    }
    else if (camData[6] && !ee_isTriggered) {
        ee_isTriggered = true;
        triggered(ee_static, ee_move);
    }
    else if (camData[5] && !s_isTriggered) {
        s_isTriggered = true;
        triggered(s_static, s_move);
    }
    else if (camData[4] && !i_isTriggered) {
        i_isTriggered = true;
        triggered(i_static, i_move);
    }
    else if (camData[3] && !g_isTriggered) {
        g_isTriggered = true;
        triggered(g_static, g_move);
    }
    else if (camData[2] && !n_isTriggered) {
        n_isTriggered = true;
        triggered(n_static, n_move);
    }
});

function triggered(template, anim) {
    // World.remove(world, template);
    template.render.visible = false;
    anim.isSleeping = false;
    setTimeout(function() {
        Body.setPosition(anim, {x:template.position.x, y:template.position.y});
        Body.setAngle(anim, template.angle);
        anim.isSleeping = true;
        // World.add(world, template);
        // console.log(template.render.visible);
        template.render.visible = true;
        d_isTriggered = false;
        e_isTriggered = false;
        c_isTriggered = false;
        k_isTriggered = false;
        dd_isTriggered = false;
        ee_isTriggered = false;
        s_isTriggered = false;
        i_isTriggered = false;
        g_isTriggered = false;
        n_isTriggered = false;
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
