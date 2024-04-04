const HEADER_LENGTH = 80;
const TRIANGLES_COUNT_LENGTH = 4;
const TRIANGLE_LENGTH = 50;

const TRIANGLES_COUNT_POS = 80;


class Triangle {
    #dv = new DataView(new ArrayBuffer(50));

    constructor(normal, vertexes) {
        if (!normal) {
            return;
        }
        this.setNormal(normal);
        for (let v = 0; v < 3; v++) {
            this.setVertex(v, vertexes[v]);
        }
    }

    setNormal(normal) {
        this.#dv.setFloat32(0, normal[0], true);
        this.#dv.setFloat32(4, normal[1], true);
        this.#dv.setFloat32(8, normal[1], true);
    }

    setVertex(n, points) {
        for (let p = 0; p < 3; p++) {
            this.#dv.setFloat32(12 + n * 12 + p * 4, points[p], true);
        }
    }

    get buffer() {
        return this.#dv.buffer;
    }

    getNormal() {
        return [this.#dv.getFloat32(0, true), this.#dv.getFloat32(4, true), this.#dv.getFloat32(8, true)];
    }

    getVertex(v) {
        return [this.#dv.getFloat32(12 + v * 12, true), this.#dv.getFloat32(12 + v * 12 + 4, true), this.#dv.getFloat32(12 + v * 12 + 8, true)];
    }
    
    fromArrayBuffer(buffer) {
        const ta = new Uint8Array(this.#dv.buffer);
        const ta_in = new Uint8Array(buffer);
        ta.set(ta_in, 0);
    }
}

module.exports =  class STL {
    #triangles = [];
    add(normal, vertexs) {
        this.#triangles.push(new Triangle(normal, vertexs));
    }

    get buffer() {
        const buffer = new ArrayBuffer(HEADER_LENGTH + TRIANGLES_COUNT_LENGTH + TRIANGLE_LENGTH * this.#triangles.length);
        const dv = new DataView(buffer);
        dv.setUint32(TRIANGLES_COUNT_POS, this.#triangles.length, true);
        const ta = new Uint8Array(buffer);
        for (let t = 0; t < this.#triangles.length; t++) {
            const offset = HEADER_LENGTH + TRIANGLES_COUNT_LENGTH + t * TRIANGLE_LENGTH;
            ta.set(new Uint8Array(this.#triangles[t].buffer), offset);
        }
        return buffer;
    }

    get triangles() {
        return this.#triangles;
    }

    addQuad(normal, p1, p2, p3, p4) {
        this.add(normal, [p1, p2, p3]);
        this.add(normal, [p1, p3, p4]);
    }

    fromDataView(dv) {
        const triangles_count = dv.getUint32(TRIANGLES_COUNT_POS, true);
        for (let t = 0; t < triangles_count; t++) {
            const buffer = dv.buffer.slice(HEADER_LENGTH + TRIANGLES_COUNT_LENGTH + t * TRIANGLE_LENGTH, HEADER_LENGTH + TRIANGLES_COUNT_LENGTH + (t + 1) * TRIANGLE_LENGTH );
            const triangle = new Triangle();
            triangle.fromArrayBuffer(buffer);
            this.#triangles.push(triangle);
        }  
    }
}