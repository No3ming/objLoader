import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { addTodo } from "./stores/actions/addTodo";
import PropTypes from "prop-types"
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
// 插件，加载obj带颜色
import objLoader from './libs/objLoader/objLoader'
objLoader(BABYLON)

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

const w = window.innerWidth
const h = window.innerHeight

@connect(mapStateToProps, {addTodo})
class App extends Component {
  constructor (props) {
    super(props)
    this.canvasRef = React.createRef()
  }
  componentDidMount () {
    this.props.addTodo(11)
    console.log(this.props)
    console.log(this.canvasRef)
    this.renderBaby()
  }
  renderBaby = () => {
    // Get the canvas DOM element
    let canvas = this.canvasRef.current
  // Load the 3D engine
    let engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
    // CreateScene function that creates and return the scene
    let createScene = function (batman) {
      // Create a basic BJS Scene object
      let scene = new BABYLON.Scene(engine);
      // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
      // 第一人物视角，我的眼睛,角度问题
      let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0.1, 5), scene);
      // Target the camera to scene origin
      // 视角看向原点
      camera.setTarget(BABYLON.Vector3.Zero());
      // Attach the camera to the canvas
      // 相机丢在canvas里，生效
      camera.attachControl(canvas, false);
      // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
      //  添加光线
      // new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 0, 50), scene);
      // 创建球体
      // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
      // let sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
      // Move the sphere upward 1/2 of its height
      // sphere.position.y = 0;
      // 创建地面
      // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
      // BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
      // Return the created scene
      console.log(BABYLON.SceneLoader.GetPluginForExtension('.obj'))
      BABYLON.SceneLoader.Load("/models/","mattingModel.obj", engine, function (scene) {
        console.log(scene)

        scene.createDefaultCameraOrLight(true, true, true);

        scene.activeCamera.alpha += Math.PI;

        // run the render loop
        engine.runRenderLoop(function(){
          scene.render();
        });
        // the canvas/window resize event handler
        window.addEventListener('resize', function(){
          engine.resize();
        });
      }, () => {}, () => {}, '.obj');
      // return scene;
    }
    // call the createScene function
    let scene = createScene();
  }
  render() {
    return (
      <div className="App">
        <canvas ref={this.canvasRef} width={w} height={h}/>
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.array,
  addTodo: PropTypes.func
}

export default App;
