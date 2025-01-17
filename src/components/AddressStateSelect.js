import React, { forwardRef } from 'react';
import {
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const StateAddress = [
  'Cebu',
  'Abra',
  'Agusan del Norte',
  'Agusan del Sur',
  'Aklan',
  'Albay',
  'Antique',
  'Apayao',
  'Aurora',
  'Basilan',
  'Bataan',
  'Batanes',
  'Batangas',
  'Benguet',
  'Biliran',
  'Bohol',
  'Bukidnon',
  'Bulacan',
  'Cagayan',
  'Camarines Norte',
  'Camarines Sur',
  'Camiguin',
  'Capiz',
  'Catanduanes',
  'Cavite',
  'Compostela Valley (Davao de Oro)[b]',
  'Cotabato',
  'Davao del Norte',
  'Davao del Sur',
  'Davao Occidental',
  'Davao Oriental',
  'Dinagat Islands',
  'Eastern Samar',
  'Guimaras',
  'Ifugao',
  'Ilocos Norte',
  'Ilocos Sur',
  'Iloilo',
  'Isabela',
  'Kalinga',
  'La Union',
  'Laguna',
  'Lanao del Norte',
  'Lanao del Sur',
  'Leyte',
  'Maguindanao',
  'Marinduque',
  'Masbate',
  'Metro Manila',
  'Mindoro Occidental',
  'Mindoro Oriental',
  'Misamis Occidental',
  'Misamis Oriental',
  'Mountain Province',
  'Negros Occidental',
  'Negros Oriental',
  'Northern Samar',
  'Nueva Ecija',
  'Nueva Vizcaya',
  'Palawan',
  'Pampanga',
  'Pangasinan',
  'Quezon',
  'Quirino',
  'Rizal',
  'Romblon',
  'Samar (Western Samar)',
  'Sarangani',
  'Siquijor',
  'Sorsogon',
  'South Cotabato',
  'Southern Leyte',
  'Sultan Kudarat',
  'Sulu',
  'Surigao del Norte',
  'Surigao del Sur',
  'Tarlac',
  'Tawi-Tawi',
  'Zambales',
  'Zamboanga del Norte',
  'Zamboanga del Sur',
  'Zamboanga Sibugay',
];

export const AddressStateSelect = forwardRef((props, ref) => {
  return (
    <>
      {/* <FormControl fullWidth variant="outlined" size="small">
        <InputLabel>State</InputLabel> */}
        {/* <Select label="State" inputRef={ref} {...props}>
          {StateAddress.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select> */}
        <Autocomplete
          id="combo-box-demo"
          fullWidth
          options={StateAddress}
          getOptionLabel={(option) => option}
          renderInput={(params, ref) => (
            <TextField {...params}  label="State" variant="outlined" size="small" inputRef={ref} name="state"/>
          )}
        />
      {/* </FormControl> */}
    </>
  );
});
