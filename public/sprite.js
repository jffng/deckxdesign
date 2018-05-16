    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.getElementById('main'),
        engine: engine,
        options: {
            // each screen is 1280px wide plus a 32px bezel between each screen
            width: (1280 + 32),
            // each screen is 720px high
            height: 720,
            background: '#18e80d',
            showAngleIndicator: false,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var offset = 10, //higher number, less visible wall
        options = { 
            isStatic: true,
            render: {fillStyle: '#18e80d'}
        };

    world.bodies = [];

    // var trigger = Bodies.rectangle(window.innerWidth/2, 164, window.innerWidth, 1, {isStatic: true, render: {fillStyle: '#18e80d'}});
    // World.add(world, trigger);

    //rectangle: x, y, width, height, [options]
    World.add(world, [
        // Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
        Bodies.rectangle(window.innerWidth/2, window.innerHeight - offset, window.innerWidth, 100, options), //bottom wall 
        Bodies.rectangle(window.innerWidth, window.innerHeight/2, 10, window.innerHeight, options), //right wall
        Bodies.rectangle(0, window.innerHeight/2, 10, window.innerHeight, options), //left wall

        //DECKxDESIGN
        Bodies.rectangle(100, 100, 64, 64, {restitution: 0.9, render: {sprite: {texture: 'd.png'}}, angle: Math.PI * 0.10}),
        Bodies.rectangle(150, 100, 64, 64, {restitution: 0.9, render: {sprite: {texture: 'e.png'}}, angle: -Math.PI * 0.15}),
        Bodies.rectangle(240, 100, 64, 64, {restitution: 0.9, render: {sprite: {texture: 'c.png'}}, angle: Math.PI * 0.10}),
        Bodies.rectangle(310, 100, 64, 64, {restitution: 0.9, render: {sprite: {texture: 'k.png'}}}),
        Bodies.rectangle(370, 100, 64, 64, {restitution: 0.9, render: {sprite: {texture: 'd.png'}}, angle: Math.PI * 0.10}),
        Bodies.rectangle(440, 100, 64, 64, {restitution: 0.9, render: {sprite: {texture: 'e.png'}}, angle: -Math.PI * 0.15}),
        Bodies.rectangle(500, 100, 64, 64, {restitution: 0.9, render: {sprite: {texture: 's.png'}}}),
        Bodies.rectangle(570, 100, 64, 64, {restitution: 0.9, render: {sprite: {texture: 'i.png'}}, angle: Math.PI * 0.10}),
        Bodies.rectangle(640, 100, 64, 64, {restitution: 0.9, render: {sprite: {texture: 'g.png'}}, angle: -Math.PI * 0.15}),
        Bodies.rectangle(710, 100, 64, 64, {restitution: 0.9, render: {sprite: {texture: 'n.png'}}, angle: Math.PI * 0.10}),

    ]);

    //stack: xx, yy, columns, rows, columnGap, rowGap, callback
    var stack = Composites.stack(20, 20, 1, 1, 10, 0, function(x, y) {
        return Bodies.rectangle(x, y, 64, 64, {
            restitution: 0.9,
            render: {
                strokeStyle: '#ffffff',
                sprite: {
                    texture: 'd.png'
                }
            }
        });
    });

    function triggered() {
        trigger.isStatic = false;
    }

    // World.add(world, stack);
    // console.log(stack);

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
