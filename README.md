# React + TypeScript + Vite

## Setup Steps

- git clone https://github.com/Phoenix-031/PixBox_Debayan_Pradhan_Frontend.git

- cd PixBox_Debayan_Pradhan_Frontend

### Install dependencies

- npm install

### Run the application

- npm run dev

# Implementations done

- Integrating a relitively not well versed library in the application
- Maanging the types
- Implementing proper hooks for potrait detection

# Improvements

- Proper api segregration into folders and implement rtk query
  - api integrated and called from within the same canvas render file making it less scalable and less clean
- Deal better with potrait presentation of the canvas
  - the canvas is not responsive to all portrait sizes which can be improved a lot
- Code structure surrounding the library implementation
    - the way fabric is implemented feels like a bit cumborsome maybe there is a better architectural way to use the api data to put in to the canvas