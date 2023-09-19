import { ConstVars } from "../../common/ConstVars";
import { IEngineInfo } from "../../common/IEngineInfo";

/**
 * 绘制选中的3d物体的位置，尺寸信息
 * ThreeJSRectMask 界面类
 * made by cyj
 * create on 2023-09-18 13:32:42 
*/
export class ThreeJSRectMask{


    private _mask:THREE.Mesh;
    private _shape:THREE.Shape;
    private _bindObj:THREE.Object3D;
    private _tempPoint:THREE.Vector3;
    private _box3:THREE.Box3;
    private _geometry:THREE.ExtrudeGeometry;
    private _engine:IEngineInfo<THREE.Object3D>;

    constructor(engine:IEngineInfo<THREE.Object3D>){
        let s = this;
        s._engine = engine;
        s._tempPoint = new THREE.Vector3();
        s._shape = new THREE.Shape();
        s._shape.moveTo(0, 0);
        s._shape.lineTo(0, 1);
        s._shape.lineTo(1, 1);
        s._shape.lineTo(1, 0);
        s._shape.lineTo(0, 0);
        s._box3 = new THREE.Box3();
        // 创建拉伸几何体
        var extrudeSettings = { depth: 0.1, bevelEnabled: false };
        s._geometry = new THREE.ExtrudeGeometry(s._shape, extrudeSettings);
        const rectMaterial = new THREE.MeshBasicMaterial({ color: 0x00C800 });
        s._mask = new THREE.Mesh(s._geometry, rectMaterial );
        s._mask["name"] = ConstVars.StageMaskName;
    }

    public showRect(obj:THREE.Object3D){
        let s = this;
        if(obj == s._engine.stage)return;
        if(s._bindObj && s._bindObj == obj)return;
        s._bindObj = obj;
        if(!obj){
            if(s._mask.parent)s._mask.parent.remove(s._mask);
            return;
        }
        s._engine.stage.add(s._mask);
        s.refush();
    }

    public refush(){
        let s = this;
        if(!s._bindObj)return;
        s._tempPoint.x = s._tempPoint.y = s._tempPoint.z = 0;
        s._tempPoint.setFromMatrixPosition(s._bindObj.matrixWorld)
        s._box3.setFromObject(s._bindObj);
        // let bounds = s._box3.size()
        // let scale = s._bindObj.getWorldScale();
        let x = s._tempPoint.x+s._box3.min.x;
        let y = s._tempPoint.y+s._box3.min.y;
        let w = s._box3.max.x-s._box3.min.x;//Math.max(20, scale.x * bounds.x);
        let h = s._box3.max.y - s._box3.min.y;//Math.max(20, scale.y * bounds.y);
        
        // 改变四方形的大小
        s._mask.position.x = x;
        s._mask.position.y = y;
        s._mask.scale.x = w;
        s._mask.scale.y = h;

//         shape.moveTo(min.x, min.y);
// shape.lineTo(max.x, min.y);
// shape.lineTo(max.x, max.y);
// shape.lineTo(min.x, max.y);
// shape.lineTo(min.x, min.y);
//         shape.moveTo(min.x + globalPosition.x, min.y + globalPosition.y);
// shape.lineTo(max.x + globalPosition.x, min.y + globalPosition.y);
// shape.lineTo(max.x + globalPosition.x, max.y + globalPosition.y);
// shape.lineTo(min.x + globalPosition.x, max.y + globalPosition.y);
// shape.lineTo(min.x + globalPosition.x, min.y + globalPosition.y);
        // s._shape.moveTo( x, y );
        // s._shape.lineTo( x, y+w );
        // s._shape.lineTo( x+w, y+h );
        // s._shape.lineTo( x, y+h );
        // s._shape.lineTo( x, y );
        // s._geometry.uvsNeedUpdate = true;
        // s._mask.geometry.vertices[0].setX(x);
        // s._mask.geometry.vertices[1].setY(y);
        // s._mask.geometry.vertices[2].setX(w);
        // s._mask.geometry.vertices[3].setY(h);
        // s._mask.geometry.verticesNeedUpdate = true;
    }



    public clear(){
        let s = this;
        // if(s._bindObj){
        //     // s._bindObj.offAllCaller(s);
        //     s._bindObj.off(Laya.Event.UNDISPLAY, s, s.clear)
        // }
        s._bindObj = null;
        if(s._mask.parent)s._mask.parent.remove(s._mask);
    }

}