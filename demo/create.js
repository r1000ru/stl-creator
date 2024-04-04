import * as fs from 'fs';
import {STLCreator} from '../src/stl-creator';

const stl = new STLCreator();

const points = [
    [10,20,30],
    [110,20,30],
    [110,220,30],
    [10,220,30],
    [10,20,330],
    [110,20,330],
    [110,220,330],
    [10,220,330],
];

stl.addQuad([0,0,0], points[0], points[3], points[2], points[1]);
stl.addQuad([0,0,0], points[4], points[5], points[6], points[7]);
stl.addQuad([0,0,0], points[0], points[1], points[5], points[4]);
stl.addQuad([0,0,0], points[3], points[7], points[6], points[2]);
stl.addQuad([0,0,0], points[0], points[4], points[7], points[3]);
stl.addQuad([0,0,0], points[1], points[2], points[6], points[5]);

fs.writeFileSync('./test.stl', Buffer.from(stl.buffer), null)