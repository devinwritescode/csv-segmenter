# RVX Labs | CSV Segmenter

## About this Project

RVX Labs | CSV Segmenter is a tool designed to make working with CSV files simpler and more efficient, whether you need to segment large files into smaller chunks or divide them into batches for easier data manipulation.

### Features

**CSV Segmenting**: Segment large CSV files from a specified start index to an end index.
**Batching**: Divide large CSV files into smaller, more manageable batches of a specified size.

### Technologies

This project was built using **React** + **Vite** + **Typescript** and **SWC**.

The core functionality includes the following libraries:

- **PapaParse** for CSV parsing
- **JSZip** for creating ZIP files
- **FileSaver** for saving files.

The styling is done via **Tailwind**.

## How to Install and Run the Project

### Prerequisites

- Node.js installed
- Yarn or npm installed

### Steps

1. Clone the repository:

```bash
git clone https://github.com/devinwritescode/csv-segmenter.git
```

2. Navigate into the project directory:

```bash
cd csv-segmenter
```

3. Install dependencies

```bash
npm install
# or
yarn install
```

4. Start the development server (Vite):

```bash
npm run dev
# or
yarn run dev
```

5. Open your web browser and visit http://localhost:3000.

## How to Use the Segmenter

View Step-by-Step instructions on Scribe http://bit.ly/csv-segmenter-demo

1. **Upload CSV File**: Click on the "Upload" button to upload your CSV file or drag and drop a file.

2. **Select Segmentation**: Enter the starting and ending indices for the segment you want to extract.

3. **Segment**: Click on the "Segment" button to download the segment as a new CSV file.

4. **Batching**: Enter the desired batch size and click the "Create Batches" button. This will create a zip file containing your data divided into batches.

5. **Download Zip**: Once the batching is done, download the Zip file that has been generated.

## License

This project is licensed under the MIT License. See the LICENSE.md file for details.
