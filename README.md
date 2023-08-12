# Map Api

## Description
A api to add markers on a map, currently it uses mongodb to store the markers.
makers are in the format of:
```json
{
  "x": 0,
  "z": 0,
  "image": "https://i.imgur.com/5ZQFv4z.png",
  "imageAnchor": [
    0.5,
    0.5
  ],
  "imageScale": 1,
  "text": "test",
  "textColor": "#000000",
  "offsetX": 0,
  "offsetY": 0,
  "font": "Arial",
}
```

## Endpoints
### GET /allpoints
Returns all points in the database
e.g. 
```json
[
  {
    "_id": "5f9b3b3b9c9b8b0017b3b3b9",
    "x": 0,
    "z": 0,
    "image": "https://i.imgur.com/5ZQFv4z.png",
    "imageAnchor": [
      0.5,
      0.5
    ],
    "imageScale": 1,
    "text": "test",
    "textColor": "#000000",
    "offsetX": 0,
    "offsetY": 0,
    "font": "Arial",
  }
]
```

### POST /point
Adds a point to the database
e.g. 
```json
{
  "x": 0,
  "z": 0,
  "image": "https://i.imgur.com/5ZQFv4z.png",
  "imageAnchor": [
    0.5,
    0.5
  ],
  "imageScale": 1,
  "text": "test",
  "textColor": "#000000",
  "offsetX": 0,
  "offsetY": 0,
  "font": "Arial",
  "password": "test"
}
```
Response:
```json
{
  "id": "5f9b3b3b9c9b8b0017b3b3b9",
  "message": "Point added",
  "success": true
}
```

### DELETE /point/:id
Deletes a point from the database
e.g. 
payload:
```json
{
  "password": "test"
}
```

### PUT /point/:id
Updates a point in the database
e.g.
payload:
```json
{
  "x": 0,
  "z": 0,
  "image": "https://i.imgur.com/5ZQFv4z.png",
  "imageAnchor": [
    0.5,
    0.5
  ],
  "imageScale": 1,
  "text": "test",
  "textColor": "#000000",
  "offsetX": 0,
  "offsetY": 0,
  "font": "Arial",
  "password": "test"
}
```

### GET /point/:id
Gets a point from the database
e.g.
```json
{
  "_id": "5f9b3b3b9c9b8b0017b3b3b9",
  "x": 0,
  "z": 0,
  "image": "https://i.imgur.com/5ZQFv4z.png",
  "imageAnchor": [
    0.5,
    0.5
  ],
  "imageScale": 1,
  "text": "test",
  "textColor": "#000000",
  "offsetX": 0,
  "offsetY": 0,
  "font": "Arial",
}
```

### GET /markers
Returns all markers in the /markers folder
e.g.
```json
[
  "map-marker-1.png",
  "map-marker-10.png",
  "map-marker-11.png"
]
```
create a simple Material UI page, with a navigation bar, which should have a link to "Add Marker" and "View Markers" page, the "Add Marker" page should have a form, which should have following fields:

X: only number between -300000 to 300000
Z: only number between -300000 to 300000
Marker Text: Only string of lenght 1 to 50
Text color: this will be a color picker, which should show up when the input field is selected
Marker: this is a drop down of images, where images will be a array of image src links (we can have a list of image links by hitting the /markers endpoint and the reponse will be a array of image links)
Password: password

upon submit the it should make request to /api/point and it'll then receive a response like this: 
{
  "id": "5f9b3b3b9c9b8b0017b3b3b9",
  "message": "Point added",
  "success": true
}
or in case of error: 
{
  "id": "5f9b3b3b9c9b8b0017b3b3b9",
  "message": "Error message",
  "success": false
}

upon success it should show a toast message "Point added" and clear the form, upon error it should show a toast message "Error message"

on the "View Markers" page, it should show a list of all the markers, with a delete button, upon clicking the delete button it should ask for password, and then make a delete request to /api/point/:id, and then show a toast message "Point deleted" upon success, and "Error message" upon error, and then refresh the list of markers,
each list item will also have "update" button upon clicking which it should take to the "Add Marker" page, with the form pre-filled with the data of the marker, and upon submit it should make a put request to /api/point/:id, and then show a toast message "Point updated" upon success, and "Error message" upon error, and then take back to the "View Markers" page, and refresh the list of markers

Keep it simple and beautiful, keep the form well centered, and the font should be mojang's official font 

