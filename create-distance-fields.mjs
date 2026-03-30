import axios from 'axios';

const AIRTABLE_API_KEY = 'patpGOX7o2bORB5Ky.d3f139282c551acfc0599adc447efe4077b2c31ef8b70c0cb668dd742af5ed3c';
const AIRTABLE_BASE_ID = 'appttSCU5u68yVq0p';
const AIRTABLE_LISTINGS_TABLE_ID = 'tblhtL6zJcZpUt3w3';

const client = axios.create({
  baseURL: `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

const fieldsToCreate = [
  {
    name: 'Distance to Magic Kingdom (mins)',
    type: 'number',
    options: {
      precision: 0,
    },
  },
  {
    name: 'Distance to Universal Studios (mins)',
    type: 'number',
    options: {
      precision: 0,
    },
  },
  {
    name: 'Distance to SeaWorld (mins)',
    type: 'number',
    options: {
      precision: 0,
    },
  },
  {
    name: 'Distance to LEGOLAND (mins)',
    type: 'number',
    options: {
      precision: 0,
    },
  },
  {
    name: 'Distance to Orlando Airport (mins)',
    type: 'number',
    options: {
      precision: 0,
    },
  },
];

async function createFields() {
  try {
    console.log(`Creating distance fields in Airtable base ${AIRTABLE_BASE_ID}...`);
    
    for (const field of fieldsToCreate) {
      try {
        const response = await client.post(`/tables/${AIRTABLE_LISTINGS_TABLE_ID}/fields`, field);
        console.log(`✓ Created field: ${field.name}`);
      } catch (error) {
        if (error.response?.status === 422 && error.response?.data?.error?.type === 'INVALID_REQUEST_BODY') {
          console.log(`⚠ Field might already exist: ${field.name}`);
        } else {
          console.error(`✗ Failed to create field ${field.name}:`, error.response?.data || error.message);
        }
      }
    }
    
    console.log('\nDistance fields setup complete!');
  } catch (error) {
    console.error('Error creating fields:', error.message);
    process.exit(1);
  }
}

createFields();
