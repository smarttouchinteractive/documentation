const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// INPUT FILES
const REALTORS_FILE = "realtors-list-full-20251208.csv";
const OFFICES_FILE = "offices.csv";
const OUTPUT_FILE = "merged-realtors.csv";

const realtors = [];
const offices = {};

// STEP 1: Load offices.csv into memory keyed by officeId
function loadOffices() {
  return new Promise((resolve) => {
    fs.createReadStream(OFFICES_FILE)
      .pipe(csv())
      .on("data", (row) => {
        offices[row.officeId] = row;
      })
      .on("end", () => {
        console.log("Loaded offices:", Object.keys(offices).length);
        resolve();
      });
  });
}

// STEP 2: Load realtors and attach office info
function loadRealtors() {
  return new Promise((resolve) => {
    fs.createReadStream(REALTORS_FILE)
      .pipe(csv())
      .on("data", (row) => {
        const officeInfo = offices[row.officeId] || {};

        realtors.push({
          ...row,
          ...officeInfo,
        });
      })
      .on("end", () => {
        console.log("Loaded realtors:", realtors.length);
        resolve();
      });
  });
}

// STEP 3: Write merged CSV
async function merge() {
  await loadOffices();
  await loadRealtors();

  // Build header automatically based on all fields
  const headers = Object.keys(realtors[0]).map((key) => ({
    id: key,
    title: key,
  }));

  const csvWriter = createCsvWriter({
    path: OUTPUT_FILE,
    header: headers,
  });

  await csvWriter.writeRecords(realtors);

  console.log("Merged file written to:", OUTPUT_FILE);
}

merge();
