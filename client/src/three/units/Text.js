import { TextureLoader, MeshBasicMaterial, Mesh } from "three";
import createGeometry from "three-bmfont-text";
import loadFont from "load-bmfont";

import Unit from "three/Unit";

class Text extends Unit {
  init = async () => {
    this.text = await new Promise((res, rej) => {
      loadFont(this.props.font, (err, font) => {
        var geometry = createGeometry({
          width: 255,
          align: "center",
          font: font,
        });

        geometry.update(this.props.text);

        // the resulting layout has metrics and bounds
        console.log(geometry.layout.height);
        console.log(geometry.layout.descender);

        // the texture atlas containing our glyphs
        var textureLoader = new TextureLoader();
        textureLoader.load("fonts/Arial.png", function (texture) {
          // we can use a simple ThreeJS material
          var material = new MeshBasicMaterial({
            map: texture,
            transparent: true,
            color: 0xaaffff,
          });

          // now do something with our mesh!
          res(Mesh(geometry, material));
        });
      });
    });

    this.props.scene.scene.add(this.text);
  };

  animate = (frame) => {};
  dispose = () => {};
}

export default Text;
