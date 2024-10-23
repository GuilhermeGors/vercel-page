import TempNode from '../core/TempNode.js';
import { positionWorldDirection } from '../accessors/Position.js';
import { nodeProxy, vec2 } from '../tsl/TSLBase.js';

class EquirectUVNode extends TempNode {

	static get type() {

		return 'EquirectUVNode';

	}

	constructor( dirNode = positionWorldDirection ) {

		super( 'vec2' );

		this.dirNode = dirNode;

	}

	setup() {

		const dir = this.dirNode;

		const u = dir.z.atan2( dir.x ).mul( 1 / ( Math.PI * 2 ) ).add( 0.5 );
		const v = dir.y.clamp( - 1.0, 1.0 ).asin().mul( 1 / Math.PI ).add( 0.5 );

		return vec2( u, v );

	}

}

export default EquirectUVNode;

export const equirectUV = /*@__PURE__*/ nodeProxy( EquirectUVNode );