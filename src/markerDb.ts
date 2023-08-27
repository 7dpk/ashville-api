import fs from 'fs';
import path from 'path';

interface Marker {
  x: number;
  z: number;
  image?: string;
  imageAnchor?: [number, number];
  imageScale?: number;
  text?: string;
  textColor?: string;
  offsetX?: number;
  offsetY?: number;
  font?: string;
}

interface MarkersData {
  isEnabled: boolean;
  markers: Marker[];
}

const markersFilePath = path.join(__dirname, 'markers.js');
console.log(markersFilePath)
function readMarkers(): MarkersData {
  try {
    const markersData = require(markersFilePath);
    console.log(markersData)
    if (!markersData || typeof markersData !== 'object' || !Array.isArray(markersData.markers)) {
      throw new Error('Invalid markers data format');
    }

    return markersData as MarkersData;
  } catch (error) {
    console.error('Error reading markers:', error);
    return { isEnabled: true, markers: [] };
  }
}
  

function writeMarkers(markersData: MarkersData): void {
  try {
    const content = `UnminedCustomMarkers = ${JSON.stringify(markersData, null, 2)}`;
    fs.writeFileSync(markersFilePath, content, 'utf-8');
  } catch (error) {
    console.error('Error writing markers:', error);
  }
}

function getMarkerById(id: number): Marker | undefined {
  const markersData = readMarkers();
  return markersData.markers.find((marker, index) => index === id);
}

function getAllMarkers(): Marker[] {
  const markersData = readMarkers();
  return markersData.markers;
}

function updateMarkerById(id: number, updatedMarker: Marker): boolean {
  const markersData = readMarkers();
  if (id >= 0 && id < markersData.markers.length) {
    markersData.markers[id] = updatedMarker;
    writeMarkers(markersData);
    return true;
  }
  return false;
}

function deleteMarkerById(id: number): boolean {
  const markersData = readMarkers();
  if (id >= 0 && id < markersData.markers.length) {
    markersData.markers.splice(id, 1);
    writeMarkers(markersData);
    return true;
  }
  return false;
}

export { Marker, MarkersData, getMarkerById, getAllMarkers, updateMarkerById, deleteMarkerById };
