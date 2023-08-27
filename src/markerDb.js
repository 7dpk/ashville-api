"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMarkerById = exports.updateMarkerById = exports.getAllMarkers = exports.getMarkerById = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const markersFilePath = path_1.default.join(__dirname, 'markers.js');
console.log(markersFilePath);
function readMarkers() {
    try {
        const markersData = require(markersFilePath);
        console.log(markersData);
        if (!markersData || typeof markersData !== 'object' || !Array.isArray(markersData.markers)) {
            throw new Error('Invalid markers data format');
        }
        return markersData;
    }
    catch (error) {
        console.error('Error reading markers:', error);
        return { isEnabled: true, markers: [] };
    }
}
function writeMarkers(markersData) {
    try {
        const content = `UnminedCustomMarkers = ${JSON.stringify(markersData, null, 2)}`;
        fs_1.default.writeFileSync(markersFilePath, content, 'utf-8');
    }
    catch (error) {
        console.error('Error writing markers:', error);
    }
}
function getMarkerById(id) {
    const markersData = readMarkers();
    return markersData.markers.find((marker, index) => index === id);
}
exports.getMarkerById = getMarkerById;
function getAllMarkers() {
    const markersData = readMarkers();
    return markersData.markers;
}
exports.getAllMarkers = getAllMarkers;
function updateMarkerById(id, updatedMarker) {
    const markersData = readMarkers();
    if (id >= 0 && id < markersData.markers.length) {
        markersData.markers[id] = updatedMarker;
        writeMarkers(markersData);
        return true;
    }
    return false;
}
exports.updateMarkerById = updateMarkerById;
function deleteMarkerById(id) {
    const markersData = readMarkers();
    if (id >= 0 && id < markersData.markers.length) {
        markersData.markers.splice(id, 1);
        writeMarkers(markersData);
        return true;
    }
    return false;
}
exports.deleteMarkerById = deleteMarkerById;
