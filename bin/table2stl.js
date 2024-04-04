#!/usr/bin/env node

import * as fs from 'fs';
import {STLCreator} from '../src/stl-creator.js';

const file = fs.openSync(process.argv[2]);
const text = fs.readFileSync(file, {encoding: "utf-8"});
const data = text.split("\n").filter(r => r.length > 0).map(r => r.split(',').map(h => parseFloat(h)));
const X = data[0].length - 1; // Три точки описывают два отрезка
const Y = data.length - 1;

const stl = new STLCreator();

stl.addQuad([0, 0, -1], [0, 0, 0 ], [X, 0, 0 ], [X, Y, 0 ], [0, Y, 0 ]);
for (let y = 0; y < Y; y++) {
    stl.addQuad([-1, 0, 0], [0, y, 0 ], [0, y + 1, 0 ], [0, y + 1, data[y + 1][0] ], [0, y, data[y][0] ]);
    stl.addQuad([1, 0, 0], [X, y, 0 ], [X, y + 1, 0 ], [X, y + 1, data[y + 1][X] ], [X, y, data[y][X] ]);
    for (let x = 0; x < X; x++) {
        if (y === 0) {
            stl.addQuad([0, -1, 0], [x, y, 0 ], [x + 1, y, 0 ], [x + 1, y, data[y][x + 1] ], [x, y, data[y][x] ]);
        }
        if (y === Y - 1) {
            stl.addQuad([0, 1, 0], [x, y + 1, 0 ], [x + 1, y + 1, 0 ], [x + 1, y + 1, data[y + 1][x + 1] ], [x, y + 1, data[y + 1][x] ]);
        }
        stl.addQuad([0, 0, 1], [x, y, data[y][x] ], [x + 1, y, data[y][x + 1] ], [x + 1, y + 1, data[y + 1][x + 1] ], [x, y + 1, data[y + 1][x] ]);
    }
}

fs.writeFileSync('./table.stl', Buffer.from(stl.buffer), null)