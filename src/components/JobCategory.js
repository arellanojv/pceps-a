import React, { forwardRef } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const jobs = [
  "Accounting / Finance",
  "Admin / Office / Clerical",
  "Agriculture / Veterinary",
  "Arts / Media / Design",
  "Call Center / BPO",
  "Domestic / Caretaker",
  "Education / Schools",
  "Engineering / Architecture",
  "Food / Restaurant",
  "Foreign Language",
  "Government / Non-profit",
  "Health / Medical / Science",
  "Hotel / Spa / Salon",
  "HR / Recruitment / Training",
  "IT / Computers",
  "Legal / Documentation",
  "Logistics / Warehousing",
  "Maritime / Seabased",
  "Production / Manufacturing",
  "Purchasing / Buyer",
  "Sales / Marketing / Retail",
  "Skilled Work / Technical",
  "Internship",
  "Others",
];

export const JobCategory = forwardRef((props, ref) => {
  return (
    <>
      <Autocomplete
        id="jobcategory"
        options={jobs}
        getOptionLabel={(option) => option}
        fullWidth
        renderInput={(params) => (
          <TextField
            fullWidth
            {...params}
            label="Category"
            variant="outlined"
            size="small"
          />
        )}
      />
    </>
  );
});
