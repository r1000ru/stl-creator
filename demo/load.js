const fs = require('fs');
const STL = require('../src/stl');

const file = fs.openSync(process.argv[2]);
const data = fs.readFileSync(file, null);
const stl = new STL();
stl.fromDataView(new DataView(new Uint8Array(data).buffer));

const triangles = stl.triangles;
for (let t = 0; t < triangles.length; t++) {
    console.log(`Triangle ${t}`);
    console.log(`   Normal ${triangles[t].getNormal().join(', ')}`);
    console.log(`   Vertex 1 ${triangles[t].getVertex(0).join(', ')}`);
    console.log(`   Vertex 2 ${triangles[t].getVertex(1).join(', ')}`);
    console.log(`   Vertex 3 ${triangles[t].getVertex(2).join(', ')}`);
}