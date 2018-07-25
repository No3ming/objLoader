## objLod.js
 使用方法：
 ### git clone XXXX
 
 如果在react中使用，参照例子：example
 ```
    import * as BABYLON from 'babylonjs'
    import 'babylonjs-loaders'
    // 插件，加载obj带颜色
    import objLoader from './libs/objLoader/objLoader'
    objLoader(BABYLON)

```
添加本例子会替代官方`babylonjs-loaders` 的加载'.obj'的代码,也是基于该代码进行修改
特殊的.obj

| v |      x    | y | z | r | g | b | 
| - | --------- | - | -  | - | - | - |
| v | -0.050824 | 0.002717 | -0.123455 | 0.592157 | 0.596078 | 0.541176 |
| v | -0.052263 | 0.006160 | -0.123455 | 0.588235 | 0.592157 | 0.533333 |


思路就是，最终渲染是通过vertexData，vertexData有一个属性是colors, https://doc.babylonjs.com/api/classes/babylon.vertexdata#colors 需要填充rgba值
也有一个positions值是要填充想，x,y,z值，所以在添加positions值的时候添加colors, positions有的地方就有colors,加就好 

修改内容

查看请代码中搜索colors及vertexPatternMesh开始了解



